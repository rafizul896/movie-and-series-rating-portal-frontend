"use client";

import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include", // include cookies
    });

    const result = await res.json();

    if (result.success && typeof window !== "undefined") {
      localStorage.setItem("accessToken", result.data.accessToken);
      console.log("Access token set:", localStorage.getItem("accessToken"));
    }

    return result;
  } catch (error: any) {
    console.error("Login error:", error);
    return Error(error);
  }
};

export const refreshToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const result = await res.json();

    if (result.success) {
      localStorage.setItem("accessToken", result.data.accessToken);
      return result.data.accessToken;
    }

    return null;
  } catch (error: any) {
    console.error("Token refresh error:", error);
    return Error(error);
  }
};
