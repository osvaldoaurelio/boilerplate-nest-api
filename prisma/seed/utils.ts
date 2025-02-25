import { createInterface } from 'node:readline/promises';

type GetRandomIntOptions = {
  min?: number;
  max?: number;
};

/**
 * Get a random integer between min and max (inclusive)
 * @param params.min - The minimum value
 * @param params.max - The maximum value
 * @returns A random integer between min and max
 */
export function GetRandomInt({ min = 1, max = 5 }: GetRandomIntOptions = {}) {
  if (min > max) return 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a parameter from the command line for users count
 * @returns The parameter value or 20 if no parameter is provided
 * @example npx ts-node ./prisma/seed 10
 */
export function getUsersCount() {
  const count = Number(process.argv[2]) || 10;

  if (isNaN(count) || count < 1 || count > 1000) {
    throw new Error(
      'Invalid count: Please provide a number between 1 and 1000',
    );
  }

  return count;
}

/**
 * Get the answer to the question "Clear database before continuing?"
 * @returns A boolean indicating whether the user wants to clear the database
 */
export async function getClearDatabaseAnswer() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(
    '> Clear database before continuing? (y/N) ',
  );

  rl.close();

  return answer.toLowerCase() === 'y';
}
