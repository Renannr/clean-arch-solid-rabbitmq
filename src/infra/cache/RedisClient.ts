import Redis from 'ioredis';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = parseInt(process.env.REDIS_PORT || '6379');

export const redis = new Redis({
  host: redisHost,
  port: redisPort,
});

redis.on('connect', () => {
  console.log('\n \t Redis Conectado com sucesso');
});

redis.on('error', (err) => {
  console.error('\n \t Redis Erro na conexão:', err);
});
