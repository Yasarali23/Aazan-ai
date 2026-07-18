import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { db } from './db';
import * as argon2 from 'argon2';

const adapter = new PrismaAdapter(db.session, db.user);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    name: 'auth_session',
    expires: false,
    attributes: {
      secure: process.env.APP_ENV === 'production',
      sameSite: 'lax',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      name: attributes.name,
      role: attributes.role,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: {
      email: string;
      name: string | null;
      role: 'USER' | 'ADMIN';
    };
  }
}

/**
 * High performance cryptographically secure hash function powered by Argon2.
 */
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password, {
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });
}

/**
 * Constant-time evaluation wrapper confirming user authorization passphrases.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}
