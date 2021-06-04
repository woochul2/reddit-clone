import { Redis } from 'ioredis';

export type MyReq = Request & {
  headers: Headers & { Authorization?: string };
};

export type MyContext = {
  req: MyReq;
  redis: Redis;
  userId: number;
};
