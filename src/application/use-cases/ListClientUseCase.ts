import { ClientEntity } from '../../domain/entities/ClientEntity';
import { redis } from '../../infra/cache/RedisClient';
import { BaseRepository } from '../../shared/repositories/BaseRepository';

export class ListClientsUseCase {
  constructor(private repository: BaseRepository<ClientEntity>,) { }

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
