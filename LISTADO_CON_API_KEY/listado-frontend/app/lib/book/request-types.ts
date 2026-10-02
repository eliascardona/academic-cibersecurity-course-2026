import { z } from 'zod';
import { zod_string, zod_uuid } from '../shared/types';

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const BookCreationEnum = z.enum([
  'CREATE_BOOK',
]);
export type BookCreationAction = z.infer<typeof BookCreationEnum>;

/*
  SAVE MESSAGE COMMAND
*/
const CreateBookCommandSchema = z.object({
  title: zod_string,
  description: zod_string,
});
export type CreateBookCommand = z.infer<typeof CreateBookCommandSchema>;


/*
  POLYMORPHIC REQUEST SCHEMA
*/
const BookCreationRequestBaseSchema = z.object({
  intent: BookCreationEnum,
});

export const CreateBookRequestBodySchema = BookCreationRequestBaseSchema.extend({
  intent: z.literal(BookCreationEnum.enum.CREATE_BOOK),
  body: CreateBookCommandSchema,
});
export type CreateBookRequestBody = z.infer<typeof CreateBookRequestBodySchema>;

export const BookCreationRequestBodySchema = z.discriminatedUnion('intent', [
  CreateBookRequestBodySchema,
]);
export type BookCreationRequestBody = z.infer<typeof BookCreationRequestBodySchema>;
