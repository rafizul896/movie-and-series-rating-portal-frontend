"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const getCurrentUser = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("refreshToken");
  if (token) {
    const decodedToken = jwtDecode(token.value);
    return decodedToken;
  }
  return null;
};

export const logoutUser = async () => {
  (await cookies()).delete("refreshToken");
};
