import * as jwt from 'jsonwebtoken';

export function generateAuthToken(data: any): string {
  return jwt.sign(data, process.env.JWT_SECRET);
}

export async function getDataFromToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
