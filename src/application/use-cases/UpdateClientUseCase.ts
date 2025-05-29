import { ClientEntity } from '../../domain/entities/ClientEntity';
import { redis } from '../../infra/cache/RedisClient';
import { BaseRepository } from '../../shared/repositories/BaseRepository';

export class UpdateClientUseCase {
  constructor(private repository: BaseRepository<ClientEntity>,) { }

  async execute(
    id: string,
    data: { nome?: string; email?: string; telefone?: string },
  ) {
    const updated = await this.repository.update(id, data);

    if (!updated) {
      throw new Error('Cliente não encontrado');
    }

    await redis.del(`cliente:${id}`);
    await redis.del('clientes:all');

    return updated;
  }
}
