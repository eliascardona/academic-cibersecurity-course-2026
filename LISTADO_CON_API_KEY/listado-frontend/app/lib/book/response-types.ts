import { z } from 'zod';
import { zod_string, zod_uuid } from '../shared/types';

/*
  API RESPONSES
*/
export const BookDtoSchema = z.object({
  bookId: zod_uuid,
  title: zod_string,
  description: zod_string,
});
export type BookDto = z.infer<
  typeof BookDtoSchema
>;

export const CreatedBookDtoSchema = z.object({
  bookId: zod_uuid,
});
export type CreatedBookDto = z.infer<
  typeof CreatedBookDtoSchema
>;

export const VerifiedMessageResponseDtoSchema = z.object({
  chatMessageId: zod_uuid,
  messageContent: zod_string,
});
export type VerifiedMessageResponseDto = z.infer<
  typeof VerifiedMessageResponseDtoSchema
>;

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const ActionResponseEnum = z.enum([
  'BOOK_CREATED',
  'MESSAGE_VERIFIED',
]);
export type ActionResponse = z.infer<
  typeof ActionResponseEnum
>;

/*
  POLYMORPHIC SERVER ACTION'S RESULT TYPE
  TO AID THE SERVER RESULT HANDLING
*/

const ActionResultBaseSchema = z.object({
  type: ActionResponseEnum,
});

export const MessageSavedResultSchema = ActionResultBaseSchema.extend({
  type: z.literal(ActionResponseEnum.enum.BOOK_CREATED),
  id: zod_uuid,
  message: zod_string,
});
export type MessageSavedResult = z.infer<typeof MessageSavedResultSchema>;

export const MesaagingActionResultSchema = z.discriminatedUnion('type', [
  MessageSavedResultSchema,
]);

export type MesaagingActionResult = z.infer<typeof MesaagingActionResultSchema>;
