import { MainViewBookCreation } from '~/components/create-book/main-view';
import { BookCreationRequestBodySchema } from '~/lib/book/request-types';
import { bookCreationActionHandler } from '~/lib/book/server';
import type { Route } from './+types/create-book';

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

  if (!formData) throw new Error("You didn't send a request body");

  const requestBody = BookCreationRequestBodySchema.parse(formData);

  const actionHandlerResult = await bookCreationActionHandler(requestBody);

  return actionHandlerResult;
}

export default function BookCreationRoute() {
  return <MainViewBookCreation />;
}
