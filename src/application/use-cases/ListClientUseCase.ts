import { redis } from '../../infra/cache/RedisClient';
import { IClientRepository } from '../protocols/IClientRepository';

export class ListClientsUseCase {
  constructor(private repository: IClientRepository) { }

  async execute() {
    const cacheKey = 'clientes:all';

    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const clients = await this.repository.findAll();

    await redis.set(cacheKey, JSON.stringify(clients), 'EX', 60);

    return clients;
  }
}
