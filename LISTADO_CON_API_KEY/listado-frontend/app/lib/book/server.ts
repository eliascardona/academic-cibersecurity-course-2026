import { type ApiClient } from '../infrastructure/api/client';
import type { ServerActionResult } from '../shared/types';
import { createBook } from './api';
import {
  BookCreationEnum,
  type BookCreationRequestBody,
} from './request-types';
import {
  ActionResponseEnum,
  type ActionResponse,
} from './response-types';

export async function bookCreationActionHandler(
  requestBody: BookCreationRequestBody,
  apiClient: ApiClient
): Promise<ServerActionResult<ActionResponse>> {
  const intent = requestBody.intent;

  if (!requestBody) return { success: false };

  try {
    switch (intent) {
      case BookCreationEnum.enum.CREATE_BOOK: {
        const savedMessage = await createBook(requestBody.body, apiClient);

        return {
          success: true,
          performedAction: ActionResponseEnum.enum.BOOK_CREATED,
          data: savedMessage,
        };
      }

      default:
        return { success: false };
    }
  } catch (error: any) {
    console.error(
      'Error performing book action:',
      error.message || 'null'
    );
    return { success: false };
  }
}
