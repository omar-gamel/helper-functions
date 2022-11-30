import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function matchPassword(password: string, hash: string): Promise<boolean> {
  const isMatched = await bcrypt.compare(password, hash);
  if (!isMatched) return false;

  return true;
}
