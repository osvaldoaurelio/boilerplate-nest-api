import { clearDatabase, createUser, desconectDatabase } from './db';
import { generateUsers } from './generators';
import { getClearDatabaseAnswer, getUsersCount } from './utils';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

async function main() {
  if (IS_PRODUCTION) throw new Error('You cannot run this in production!');

  const usersCount = getUsersCount();
  console.log(`# This seed will create ${usersCount} new users...\n`);

  const shouldClearDatabase = await getClearDatabaseAnswer();
  if (shouldClearDatabase) await clearDatabase();

  await Promise.all(generateUsers(usersCount).map(createUser));
  console.log('\n# Done!');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(desconectDatabase);
