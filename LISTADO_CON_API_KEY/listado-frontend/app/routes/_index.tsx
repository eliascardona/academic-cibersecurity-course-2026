import { data, useLoaderData } from 'react-router';
import type { Route } from './+types/_index';
import { findAllBooks } from '~/lib/book/api';
import { apiClient } from '~/lib/infrastructure/api/client';
import { BookList } from '~/components/book-list/main-view';
import { GoToBookCreationButton } from '~/components/create-book/go-to-book-creation-button';
import type { BookDto } from '~/lib/book/response-types';
import { getAccessToken } from '~/lib/infrastructure/auth/utils';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'A book list App' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const accessToken = await getAccessToken(args.request);
  
  console.log('[FROM LOADER]', accessToken);

  // const books = await findAllBooks(apiClient);
  const books = [] as Record<string, string>[];
  
  return data(books);
}

export default function BookListingIndexRoute() {
  // const books = useLoaderData<typeof loader>();
  const books = [] as BookDto[];

  return (
    <div className='grid w-full'>
      <div className='grid w-3/4 place-self-center'>
        <GoToBookCreationButton />
        <BookList books={books} />
      </div>
    </div>
  );
}
