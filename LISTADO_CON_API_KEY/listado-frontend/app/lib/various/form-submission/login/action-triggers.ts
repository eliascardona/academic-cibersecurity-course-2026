import {
  useSubmitFromReactRouter,
  type BaseUseFormSubmitOptions,
  type SubmitFunctionAbstraction,
} from '../utils';
import {
  formatDataIntoLoginRequest,
} from './payload-formatters';
import type { LoginCommand } from '~/lib/login/request-types';

function generateSubmitOptionsForLogin(
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const OPTIONS: BaseUseFormSubmitOptions = {
    method: 'POST' as const,
    action: `/login` as const,
    contentType: 'application/json' as const,
    submit,
  };

  return OPTIONS;
}

export function triggerLoginAction(
  data: LoginCommand,
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const options = generateSubmitOptionsForLogin(submit);

  const { submitForm } = useSubmitFromReactRouter(options);
  const formattedData = formatDataIntoLoginRequest(data);

  submitForm(formattedData);
}
