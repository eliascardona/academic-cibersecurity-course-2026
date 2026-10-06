import { MainViewBookCreation } from '~/components/create-book/main-view';
import { BookCreationRequestBodySchema } from '~/lib/book/request-types';
import { bookCreationActionHandler } from '~/lib/book/server';
import type { Route } from './+types/create-book';
import { getAccessToken } from '~/lib/infrastructure/auth/utils';
import { createClientWithToken } from '~/lib/infrastructure/api/client';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'A book list App' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export async function action(args: Route.ActionArgs) {
  const formData = await args.request.json();
  const accessToken = await getAccessToken(args.request) as string;

  if (!accessToken)
    throw new Error("You didn't provide a valid access token");

  const apiClient = createClientWithToken(accessToken);

  if (!formData) throw new Error("You didn't send a request body");

  const requestBody = BookCreationRequestBodySchema.parse(formData);

  const actionHandlerResult = await bookCreationActionHandler(
    requestBody,
    apiClient
  );

  return actionHandlerResult;
}

export default function BookCreationRoute() {
  return <MainViewBookCreation />;
}
