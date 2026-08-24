import { NextRequest, NextResponse } from "next/server";

import { verifyJwtToken } from "./utils/jwt";
import { envVar } from "./config/envConfig";
import { getNewAccessAndRefreshToken } from "./app/(auth)/_service/getNewAccessAndRefreshToken.ts";
import { string } from "zod";
import {
  setAccessTokenIntoCookie,
  setRefreshTokenIntoCookie,
} from "./utils/cookie";
import ms, { StringValue } from "ms";
import { JwtPayload } from "jsonwebtoken";
import { routeTester } from "./utils/proxy.utils";
import {
  AUTH_ROUTES,
  COOKIE_OPTIONS,
  DASHBOARD_ROUTES,
  PUBLIC_ROUTES,
} from "./constants/proxy.constant";
import { Role, TokenNames } from "./interface/auth.interface";



export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.url;
  const { pathname, search } = request.nextUrl;

  let accessToken = request.cookies.get(TokenNames.ACCESS_TOKEN)?.value;
  let refreshToken = request.cookies.get(TokenNames.REFRESH_TOKEN)?.value;

  let decodedAccessToken = accessToken
    ? verifyJwtToken(accessToken, envVar.JWT_ACCESS_TOKEN_SECRET as string)
    : null;

  //Authentication Part
  if (!decodedAccessToken && refreshToken) {
    const decodedRefreshToken = verifyJwtToken(
      refreshToken,
      envVar.JWT_REFRESH_TOKEN_SECRET as string,
    );

    if (decodedRefreshToken.success) {
      const newTokens = await getNewAccessAndRefreshToken();

      accessToken = newTokens.data?.accessToken as string;
      refreshToken = newTokens.data?.refreshToken;

      if (accessToken) {
        const maxAge =
          ms(envVar.JWT_REFRESH_TOKEN_EXPIRE_IN as StringValue) / 1000;
        response.cookies.set(TokenNames.ACCESS_TOKEN, accessToken, {
          ...COOKIE_OPTIONS,
          maxAge,
        });
      }
      if (refreshToken) {
        const maxAge =
          ms(envVar.JWT_REFRESH_TOKEN_EXPIRE_IN as StringValue) / 1000;
        response.cookies.set(TokenNames.REFRESH_TOKEN, refreshToken, {
          ...COOKIE_OPTIONS,
          maxAge,
        });
      }
      decodedAccessToken = verifyJwtToken(
        accessToken,
        envVar.JWT_ACCESS_TOKEN_SECRET as string,
      );
    }
  }

  if (!decodedAccessToken?.success) {
    response.cookies.delete(TokenNames.ACCESS_TOKEN);
    response.cookies.delete(TokenNames.REFRESH_TOKEN);
  }

  /////////////Authorization part//////////////////

  const userRole = (decodedAccessToken?.data as JwtPayload)?.role || null;

  const isPublicRoute = routeTester(pathname, PUBLIC_ROUTES);
  const isAuthRoutes = routeTester(pathname, AUTH_ROUTES);

  const redirectToDashboard = () => {
    const redirectTo = DASHBOARD_ROUTES[userRole as Role];
    return NextResponse.redirect(new URL(redirectTo, url));
  };
  //If user try to go protect route
  if (!decodedAccessToken?.success && !isPublicRoute && !isAuthRoutes) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname + search);
    return NextResponse.redirect(loginUrl);
  }
  //If logged user try to go auth route (login, registration),
  if (decodedAccessToken?.success && isAuthRoutes) {
    return redirectToDashboard();
  }

  //Users role base route
  // if (userRole && pathname !== DASHBOARD_ROUTES[userRole as keyof typeof Role]) {
  //   return redirectToDashboard;
  // }

  if (pathname === DASHBOARD_ROUTES[Role.ADMIN] && userRole !== Role.ADMIN) {
    return redirectToDashboard();
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|\\.well-known|.*\\.png$).*)",
  ],
};
