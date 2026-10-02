import { apiClient } from "../api/client";
import { zod_string } from "~/lib/shared/types";
import z from "zod";
import type { LoginCommand } from "~/lib/login/request-types";

export const LegacyAuthResponseSchema = z.object({
  access_token: zod_string,
  authData: z.record(zod_string, z.any()),
  expires_in: z.number(),
});
export type LegacyAuthResponse = z.infer<typeof LegacyAuthResponseSchema>;

export const AuthResponseSchema = z.object({
  access_token: zod_string,
  id_token: zod_string,
  session_state: zod_string,
  scope: zod_string,
  token_type: zod_string,
  authData: z.record(zod_string, z.any()),
  expires_in: z.number(),
  refresh_expires_in: z.number(),
  'not-before-policy': z.number(),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export async function performLogin(
  formData: Record<string, any>,
): Promise<LegacyAuthResponse> {
  try {
    const result = await apiClient.post<LegacyAuthResponse>("/auth/login", formData);
    return result;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
}

export async function performLoginWithKeycloak(
  loginCommand: LoginCommand,
): Promise<AuthResponse> {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("client_id", "fastapi-api");
    params.append("username", loginCommand.username);
    params.append("password", loginCommand.password);
    params.append("scope", "openid");

    console.log(params.toString());

    const response = await fetch(`http://localhost:8081/realms/cybersecurity/protocol/openid-connect/token`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params, // application/x-www-form-urlencoded
    });
    const json = await response.json()

    console.log("[Response from Keyclock API]", json);

    return json;

  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
}
