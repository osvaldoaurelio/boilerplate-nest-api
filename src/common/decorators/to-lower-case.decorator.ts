import { Transform } from 'class-transformer';

export function ToLowerCase() {
  return Transform(({ value }) => {
    try {
      return value?.toLowerCase();
    } catch {
      return value;
    }
  });
}
