import { Transform } from 'class-transformer';

export function ToISOString() {
  return Transform(({ value }) => {
    try {
      return new Date(value).toISOString();
    } catch {
      return value;
    }
  });
}
