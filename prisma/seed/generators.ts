import { faker } from '@faker-js/faker';
import { Priority } from '@prisma/client';
import { GetRandomInt } from './utils';

/**
 * Hashed password generated using argon2 library.
 * The unhashed password is 'Test@123'.
 */
const HASHED_PASSWORD =
  '$argon2id$v=19$m=65536,t=3,p=4$ZGfvFUM2+RRGJHvSaEuxjA$KTn/xKdsdZF5VmR8xs56yJOz5gAldRz9dIZpPz2tWfc';

function generateTasks(length = GetRandomInt({ min: 0, max: 10 })) {
  return Array.from({ length }, () => {
    const title = faker.word.words(GetRandomInt({ min: 2 }));
    const description = `${title} description`;

    return {
      title,
      description,
      priority: Priority.LOW,
      isDone: false,
    };
  });
}

export function generateUsers(length: number) {
  return Array.from({ length }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      fullName: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: HASHED_PASSWORD,
      tasks: { create: generateTasks() },
    };
  });
}
