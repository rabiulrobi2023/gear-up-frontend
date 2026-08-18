"use server";

import { IRegisterResponse } from "@/interface/auth.interface";
import { backendBaseUrl } from "@/utils/url";

export const registerAction = async (
  _previousState: IRegisterResponse | null,
  formData: FormData,
): Promise<IRegisterResponse> => {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const role = formData.get("role");
  const password = formData.get("password");

  try {
    const res = await fetch(`${backendBaseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
        role,
        password,
      }),
      cache: "no-store",
    });

    const result: IRegisterResponse = await res.json();

    if (!res.ok || !result.success || !result.data) {
      return {
        success: false,
        message: result.message || "Registration failed",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message || "User registered successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again",
      data: null,
    };
  }
};
