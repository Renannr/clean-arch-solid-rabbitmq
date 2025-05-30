import dotenv from 'dotenv';
import { redis } from './infra/cache/RedisClient';
import * as database from './infra/database';
import { startConsumer } from './infra/messaging/Consumer';
import app from './infra/server/app';

dotenv.config();

async function main() {
  await database.connect();
  const PORT = parseInt(process.env.PORT || '3000');

  redis
    .ping()
    .then(() => console.log('\n \t Redis Conectado com sucesso'))
    .catch((err) => console.error('Erro ao conectar:', err));

  startConsumer('cliente_cadastrado')
    .then(() => console.log('\n \t Consumidor iniciado'))
    .catch((err) => console.error('Erro ao iniciar consumidor:', err));

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n \t Servidor rodando na porta ${PORT}`);
  });
}

main();
