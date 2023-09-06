import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://becoming-albacore-33776.upstash.io',
  token:
    'AYPwASQgNjYyOWZkMTYtMTNkZC00NDVhLWEwNTMtNmFmMDVkNmFhMjhhZWE3OGEyZjVlMTMzNGE4MmExZTM3ZWNhODc2NmJjMGM=',
});

export default redis;
