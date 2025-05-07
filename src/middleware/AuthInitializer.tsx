import { refreshToken } from "@/services/authService";

export default async function AuthInitializer() {
  await refreshToken();
  return null; 
}
