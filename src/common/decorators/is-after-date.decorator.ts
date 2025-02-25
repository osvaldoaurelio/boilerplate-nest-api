import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
class IsAfterDateConstraint implements ValidatorConstraintInterface {
  validate(value: string, { object, constraints }: ValidationArguments) {
    const relatedValue = object[constraints[0]];

    return value > relatedValue;
  }

  defaultMessage({ property, constraints }: ValidationArguments) {
    return `${property} must be after ${constraints[0]}`;
  }
}

export function IsAfterDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAfter',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsAfterDateConstraint,
    });
  };
}
