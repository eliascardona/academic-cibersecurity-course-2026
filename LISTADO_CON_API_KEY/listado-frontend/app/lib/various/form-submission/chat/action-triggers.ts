import type { CreateBookCommand } from '~/lib/book/request-types';
import {
  useSubmitFromReactRouter,
  type BaseUseFormSubmitOptions,
  type SubmitFunctionAbstraction,
} from '../utils';
import {
  formatDataIntoSaveMessageRequest,
} from './payload-formatters';

function generateSubmitOptionsForBookCreation(
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const OPTIONS: BaseUseFormSubmitOptions = {
    method: 'POST' as const,
    action: `/create-book` as const,
    contentType: 'application/json' as const,
    submit,
  };

  return OPTIONS;
}

export function triggerBookCreation(
  data: CreateBookCommand,
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const options = generateSubmitOptionsForBookCreation(submit);

  const { submitForm } = useSubmitFromReactRouter(options);
  const formattedData = formatDataIntoSaveMessageRequest(data);

  submitForm(formattedData);
}
