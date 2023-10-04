import { HttpStatus } from '@nestjs/common';
export interface IAppError {
  statusCode: number;
  message: string | object | any;
  error_code: string;
}
function createError(message: string, statusCode: number, error_code: string) {
  return {
    message,
    statusCode,
    ...(error_code && { error_code }),
  } as IAppError;
}

export const APP_ERROR = {
  AUTH: {
    registeredUsedEmail: createError(
      'Email already used',
      HttpStatus.CONFLICT,
      'EAU000',
    ),
    unauthorized: createError(
      'Unauthorized',
      HttpStatus.UNAUTHORIZED,
      'EAU002',
    ),
  },
  USER: {
    notFound: createError('Unauthorized', HttpStatus.UNAUTHORIZED, 'EUS001'),
    isInactive: createError(
      'The user is inactive',
      HttpStatus.UNAUTHORIZED,
      'EUS002',
    ),
  },
};
