import { ClientEntity } from '../../domain/entities/ClientEntity';
import { redis } from '../../infra/cache/RedisClient';
import { IClientRepository } from '../protocols/IClientRepository';
import { IMessagePublisher } from '../protocols/IMessagePublisher';

export class CreateClientUseCase {
  constructor(
    private repository: IClientRepository,
    private publisher: IMessagePublisher
  ) { }

  async execute(data: { name: string; email: string; phone: string }) {
    try {
      const cliente = new ClientEntity(data.name, data.email, data.phone);
      const created = await this.repository.create(cliente);

      await this.publisher.publish('cliente_cadastrado', created);

      await redis.del('clientes:all');

      return created;
    } catch (error) {
      throw error;
    }
  }
}