import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../interfaces';

export const isLoggedIn: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('로그인하지 않음');
  }
  return next();
};
