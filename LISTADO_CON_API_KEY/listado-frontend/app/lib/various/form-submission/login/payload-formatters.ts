import type { LoginCommand } from '~/lib/login/request-types';

export function formatDataIntoLoginRequest(command: LoginCommand) {
  return command;
}
