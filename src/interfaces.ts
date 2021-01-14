import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { Request, Response } from 'express';
import session from 'express-session';

export interface MyContext {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & {
    session: session.Session &
      Partial<session.SessionData> & { userId: number };
  };
  res: Response;
}
