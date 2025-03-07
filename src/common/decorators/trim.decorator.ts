import { Transform } from 'class-transformer';

export function Trim() {
  return Transform(({ value }) => {
    try {
      return value?.trim();
    } catch {
      return value;
    }
  });
}
