import Redis from 'ioredis';

export function printRedisValues(redis: Redis.Redis) {
  redis.keys('*', (err, keys) => {
    if (err) {
      console.error(err);
      return;
    }
    keys.forEach((key) => {
      redis.get(key, (err, value) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(value);
      });
    });
  });
}
