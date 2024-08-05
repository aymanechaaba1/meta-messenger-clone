import Redis from 'ioredis';
import { Redis as ClientRedis } from '@upstash/redis';

const redis = new Redis(
  `rediss://default:${process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN}@organic-salmon-31514.upstash.io:6379`
);

export const clientRedis = new ClientRedis({
  url: 'https://organic-salmon-31514.upstash.io',
  token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN!,
});

export default redis;
