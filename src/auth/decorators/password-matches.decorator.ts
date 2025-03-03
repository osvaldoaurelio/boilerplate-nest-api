import { applyDecorators } from '@nestjs/common';
import { Matches } from 'class-validator';

export function StrongPassword() {
  function createConstraintMessage(constraint: string) {
    return { message: `password must contain at least one ${constraint}` };
  }

  return applyDecorators(
    Matches(/(?=.*\d)/, createConstraintMessage('number')),
    Matches(/(?=.*\W+)/, createConstraintMessage('special character')),
    Matches(/(?=.*[A-Z])/, createConstraintMessage('uppercase letter')),
    Matches(/(?=.*[a-z])/, createConstraintMessage('lowercase letter')),
  );
}
