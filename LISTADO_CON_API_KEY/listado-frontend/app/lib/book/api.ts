import { type ApiClient } from '../infrastructure/api/client';
import type { CreateBookCommand } from './request-types';
import type {
  BookDto,
  CreatedBookDto,
} from './response-types';

export async function createBook(
  command: CreateBookCommand,
  client: ApiClient
): Promise<CreatedBookDto> {
  try {
    const response = await client.post<CreatedBookDto>(
      `/books/create`,
      command
    );
    console.log('[API] - Book creation:', response);

    return response;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
}

export async function findAllBooks(
  client: ApiClient
): Promise<BookDto[]> {
  try {
    const response = await client.get<BookDto[]>(
      `/books`,
    );

    return response;
  } catch (error) {
    console.error('Error finding books:', error);
    throw error;
  }
}
