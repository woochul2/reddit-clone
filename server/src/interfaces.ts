import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response } from 'express';
import session from 'express-session';
import { Redis } from 'ioredis';

export interface MyContext {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & {
    session: session.Session &
      Partial<session.SessionData> & { userId: number };
  };
  res: Response;
  redis: Redis;
}
