import { redis } from '../../infra/cache/RedisClient';
import { ClientRepository } from '../../infra/database/mongodb/ClientRepository';

export class GetClientByIdUseCase {
  constructor(private repository: ClientRepository) { }

  async execute(id: string) {
    const cacheKey = `cliente:${id}`;

    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const cliente = await this.repository.findById(id);
    if (cliente) {
      await redis.set(cacheKey, JSON.stringify(cliente));
    }

    return cliente;
  }
}