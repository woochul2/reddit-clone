import Redis from 'ioredis';

export function printRedisKeys(redis: Redis.Redis) {
  redis.keys('*', (err, keys) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(keys);
  });
}
