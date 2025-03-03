import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TasksTitle = { title: string };

export async function clearDatabase() {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  console.log('\n# Database cleared');
}

export async function createUser(data: Prisma.UserCreateInput) {
  const userCreateArgs = { data, include: { tasks: true } };
  const { fullName, tasks } = await prisma.user.create(userCreateArgs);

  const taskstitle = tasks.map(({ title }: TasksTitle) => title);
  console.log('\n', { userFullName: fullName, taskstitle });
}

export function desconectDatabase() {
  prisma.$disconnect().catch(() => {});
}
