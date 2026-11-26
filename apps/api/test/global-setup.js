import '../src/load-env.ts';
import { execFileSync } from 'node:child_process';

export default function migrateTestDatabase() {
  execFileSync('prisma', ['migrate', 'deploy'], {
    env: { ...process.env, CHECKPOINT_DISABLE: '1' },
    stdio: 'pipe',
  });
}
