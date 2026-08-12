"use server";

export const routeTester = (
  pathName: string,
  routes: string[],
): boolean => routes.some(
  (route) => pathName === route || pathName.startsWith(`${route}/`),
);