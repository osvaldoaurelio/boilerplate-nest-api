import { applyDecorators } from '@nestjs/common';
import { Matches } from 'class-validator';

export function PasswordMatches() {
  function getMessage(constraint: string) {
    return `The password must contain at least one ${constraint}`;
  }

  return applyDecorators(
    Matches(/(?=.*\d)/, { message: getMessage('number') }),
    Matches(/(?=.*\W+)/, { message: getMessage('special character') }),
    Matches(/(?=.*[A-Z])/, { message: getMessage('uppercase letter') }),
    Matches(/(?=.*[a-z])/, { message: getMessage('lowercase letter') }),
  );
}
