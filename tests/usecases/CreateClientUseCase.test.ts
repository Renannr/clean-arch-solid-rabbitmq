import { IMessagePublisher } from '../../src/application/protocols/IMessagePublisher';
import { CreateClientUseCase } from '../../src/application/use-cases/CreateClientUseCase';
import { ClientEntity } from '../../src/domain/entities/ClientEntity';
import { BaseRepository } from '../../src/shared/repositories/BaseRepository';

const mockRepo: BaseRepository<ClientEntity> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

const mockPublisher: IMessagePublisher = {
  publish: jest.fn(),
};

describe('CreateClientUseCase', () => {
  it('should create a client and publish a message', async () => {
    const useCase = new CreateClientUseCase(mockRepo, mockPublisher);

    const mockClient = {
      name: 'João',
      email: 'joao@email.com',
      phone: '123456789',
    };
    const createdClient = { id: '1', ...mockClient };

    (mockRepo.create as jest.Mock).mockResolvedValue(createdClient);

    const result = await useCase.execute(mockClient);

    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining(mockClient),
    );
    expect(mockPublisher.publish).toHaveBeenCalledWith(
      'cliente_cadastrado',
      createdClient,
    );
    expect(result).toEqual(createdClient);
  });
});
