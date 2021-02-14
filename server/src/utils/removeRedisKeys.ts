import Redis from 'ioredis';

export function removeRedisKeys(redis: Redis.Redis) {
  redis.keys('*', (err, keys) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      keys.forEach(async (key) => {
        await redis.del(key);
      });
      console.log('redis keys 삭제 완료');
    } catch (err) {
      console.error(err);
    }
  });
}
