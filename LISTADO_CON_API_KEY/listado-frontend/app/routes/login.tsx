import { data } from "react-router";
import { MainViewLogin } from "~/components/auth/login/main-view";
import { performLoginWithKeycloak } from "~/lib/infrastructure/auth/api";
import type { Route } from "./+types/login";
import { accessTokenCookie } from "~/lib/infrastructure/auth/utils";

export function meta(args: Route.MetaArgs) {
  return [
    { title: "Online Products Selling App" },
    {
      name: "description",
      content: "Coloca una descripción útil para las búsquedas de Google",
    },
  ];
}

export async function action(args: Route.ActionArgs) {
  const formData = await args.request.json();
  if (!formData) throw new Error("Error in request body");

  const authResponse = await performLoginWithKeycloak(formData);

  if (authResponse) {
    return data(
      {
        success: true,
        message: "Thanks, we have recieved your submission",
        response: authResponse,
      },
      {
        headers: {
          "Set-Cookie": await accessTokenCookie.serialize(
            authResponse.access_token,
          ),
        },
      },
    );
  }
  return data({
    success: false,
    message: "We got an internal error",
    response: null,
  });
}

export default function LoginRoute() {
  return <MainViewLogin />;
}
