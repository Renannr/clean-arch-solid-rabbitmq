import { IClientRepository } from '../protocols/IClientRepository';

export class ListClientsUseCase {
  constructor(private repository: IClientRepository) { }

  async execute() {
    return await this.repository.findAll();
  }
}