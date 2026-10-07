import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

export async function getUserByEmail(
  email: string,
): Promise<AuthUser | null> {
  const rows = await sql`
    SELECT
      id,
      name,
      email,
      password_hash
    FROM users
    WHERE LOWER(email) = LOWER(${email})
    LIMIT 1
  `;

  const row = rows[0];

  if (!row) {
    return null;
  }

  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    passwordHash: String(row.password_hash),
  };
}