import { redis } from '../../infra/cache/RedisClient';
import { IClientRepository } from '../protocols/IClientRepository';

export class GetClientByIdUseCase {
  constructor(private repository: IClientRepository) { }

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