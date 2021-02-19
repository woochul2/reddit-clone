import jwt from 'jsonwebtoken';
import { MyReq } from '../types';

function getTokenPayload(token: string): { userId: string } {
  return jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
}

export function getUserId(req: MyReq, authToken?: string): number {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userId } = getTokenPayload(token);
      return parseInt(userId);
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return parseInt(userId);
  }

  throw new Error('Not authenticated');
}
