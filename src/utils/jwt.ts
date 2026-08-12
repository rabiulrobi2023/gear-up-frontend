/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

export const verifyJwtToken = (token: string, secret: string) => {
  try {
    const result = jwt.verify(token, secret);

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message,
    };
  }
};
