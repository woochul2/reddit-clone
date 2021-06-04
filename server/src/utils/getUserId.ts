import { APIGatewayProxyEventV2 } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { MyReq } from '../types';

function getTokenPayload(token: string): { userId: string } {
  return jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
}

export function getUserId(event: APIGatewayProxyEventV2 | MyReq): number | null {
  const authHeader = event.headers.Authorization;
  if (!authHeader) return null;

  const token = authHeader.replace('Bearer ', '');
  const { userId } = getTokenPayload(token);
  if (!userId) return null;

  return parseInt(userId);
}
