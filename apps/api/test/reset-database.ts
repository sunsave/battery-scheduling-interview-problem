import { PrismaService } from '../src/prisma/prisma.service.js';

export async function resetDatabase(prisma: PrismaService) {
  const tables = await prisma.$queryRaw<{ name: string }[]>`
    SELECT name FROM sqlite_master
    WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name != '_prisma_migrations'
  `;
  await prisma.$executeRawUnsafe('PRAGMA foreign_keys = OFF');
  for (const { name } of tables) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${name}"`);
  }
  await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON');
}
