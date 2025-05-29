import { redis } from '../../infra/cache/RedisClient';
import { IClientRepository } from '../protocols/IClientRepository';

export class UpdateClientUseCase {
  constructor(private repository: IClientRepository) {}

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
