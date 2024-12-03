import jwt from 'jsonwebtoken';
import { secretKey } from './config'; // Define your secret key for JWT validation

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}
