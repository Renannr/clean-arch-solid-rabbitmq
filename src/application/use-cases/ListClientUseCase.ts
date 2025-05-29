import { ClientRepository } from '../../infra/database/mongodb/ClientRepository';

export class ListClientsUseCase {
  constructor(private repository: ClientRepository) { }

  async execute() {
    return await this.repository.findAll();
  }
}