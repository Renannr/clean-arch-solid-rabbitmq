import { ClientEntity } from '../../domain/entities/ClientEntity';
import { redis } from '../../infra/cache/RedisClient';
import { BaseRepository } from '../../shared/repositories/BaseRepository';

export class GetClientByIdUseCase {
  constructor(private repository: BaseRepository<ClientEntity>,) { }

  async execute(id: string) {
    const cacheKey = `cliente:${id}`;

    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const cliente = await this.repository.findById(id);

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    await redis.set(cacheKey, JSON.stringify(cliente));

    return cliente;
  }
}
