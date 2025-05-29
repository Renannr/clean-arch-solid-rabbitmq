import { ClientEntity } from '../../../domain/entities/ClientEntity';
import { ClientModel } from './schemas/ClientSchema';

export class ClientRepository {
  async create(data: ClientEntity): Promise<ClientEntity> {
    const created = await ClientModel.create(data);
    return created.toObject();
  }

  async findAll(): Promise<ClientEntity[]> {
    const clients = await ClientModel.find();
    return clients.map((c) => c.toObject());
  }

  async findById(id: string): Promise<ClientEntity | null> {
    const client = await ClientModel.findById(id);
    return client ? client.toObject() : null;
  }

  async update(id: string, data: Partial<ClientEntity>): Promise<ClientEntity | null> {
    const updated = await ClientModel.findByIdAndUpdate(id, data, { new: true });
    return updated ? updated.toObject() : null;
  }
}
