import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';
// import { Post } from './entities/Post';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  // const post = orm.em.create(Post, { title: 'Test' });
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
};

main().catch((err) => {
  console.log(err);
});
