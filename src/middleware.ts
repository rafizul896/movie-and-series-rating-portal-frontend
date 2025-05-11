import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];
const commonRoutes = ["/"];

const roleBasedPrivateRoutes = {
  USER: [/^\/user/],
  ADMIN: [/^\/admin/, /^\/dashboard/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  // Allow access to auth routes for non-authenticated users
  if (authRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated (except for auth routes)
  if (!userInfo) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  if (commonRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check role-based access
  const userRole = userInfo.role as Role;

  if (roleBasedPrivateRoutes[userRole]) {
    const isAllowed = roleBasedPrivateRoutes[userRole].some((route) =>
      pathname.match(route)
    );

    if (isAllowed) {
      return NextResponse.next();
    }
  }

  // Redirect to home if no access
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
