import { ClientEntity } from '../../domain/entities/ClientEntity';
import { ClientRepository } from '../../infra/database/mongodb/ClientRepository';
import { IMessagePublisher } from '../protocols/IMessagePublisher';

export class CreateClientUseCase {
  constructor(
    private repository: ClientRepository,
    private publisher: IMessagePublisher
  ) { }

  async execute(data: { name: string; email: string; phone: string }) {
    const cliente = new ClientEntity(data.name, data.email, data.phone);
    const created = await this.repository.create(cliente);

    await this.publisher.publish('cliente_cadastrado', created);

    return created;
  }
}