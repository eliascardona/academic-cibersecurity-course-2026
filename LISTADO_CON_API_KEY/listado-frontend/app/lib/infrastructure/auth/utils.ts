import { createCookie } from "react-router";

export const accessTokenCookie = createCookie("access_token", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
});

export async function getAccessToken(request: Request) {
  const cookieHeader = request.headers.get("Cookie");

  return accessTokenCookie.parse(cookieHeader);
}