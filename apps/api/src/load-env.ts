import { existsSync } from 'node:fs';

const mode = process.env.NODE_ENV ?? 'development';

const envFilesByPrecedence =
  mode === 'test'
    ? ['.env.test.local', '.env.test']
    : [`.env.${mode}.local`, '.env.local', `.env.${mode}`, '.env'];

for (const envFile of envFilesByPrecedence) {
  if (existsSync(envFile)) {
    process.loadEnvFile(envFile);
  }
}
