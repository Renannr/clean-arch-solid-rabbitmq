import { redis } from '../../infra/cache/RedisClient';
import { ClientRepository } from '../../infra/database/mongodb/ClientRepository';

export class UpdateClientUseCase {
  constructor(private repository: ClientRepository) { }

  async execute(id: string, data: { nome?: string; email?: string; telefone?: string }) {
    const updated = await this.repository.update(id, data);

    await redis.del(`cliente:${id}`);

    return updated;
  }
}