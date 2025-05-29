import { ClientEntity } from '../../domain/entities/ClientEntity';

export interface IClientRepository {
  create(cliente: ClientEntity): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  findById(id: string): Promise<ClientEntity | null>;
  update(id: string, data: Partial<ClientEntity>): Promise<ClientEntity | null>;
}
