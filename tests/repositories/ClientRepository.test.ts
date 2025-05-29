import { ClientRepository } from '../../src/infra/database/mongodb/ClientRepository';
import { ClientModel } from '../../src/infra/database/mongodb/schemas/ClientSchema';

jest.mock('../../src/infra/database/mongodb/schemas/ClientSchema', () => ({
  ClientModel: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('ClientRepository (mocked)', () => {
  let repo: ClientRepository;

  beforeEach(() => {
    repo = new ClientRepository();
    jest.clearAllMocks();
  });

  it('should call create and return a client', async () => {
    const data = { name: 'joao', email: 'joao@email.com', phone: '1234' };
    const fakeCreated = {
      ...data,
      id: '123',
      toObject: () => ({ ...data, id: '123' }),
    };

    (ClientModel.create as jest.Mock).mockResolvedValue(fakeCreated);

    const result = await repo.create(data);

    expect(ClientModel.create).toHaveBeenCalledWith(data);
    expect(result).toMatchObject(data);
  });

  it('should call findById and return a client', async () => {
    const fakeClient = {
      name: 'ana',
      email: 'ana@email.com',
      phone: '9876',
      toObject: () => ({
        name: 'ana',
        email: 'ana@email.com',
        phone: '9876',
        id: '1',
      }),
    };

    (ClientModel.findById as jest.Mock).mockResolvedValue(fakeClient);

    const result = await repo.findById('1');

    expect(ClientModel.findById).toHaveBeenCalledWith('1');
    expect(result).toMatchObject({
      name: 'ana',
      email: 'ana@email.com',
      phone: '9876',
    });
  });

  it('should call find and return an array of clients', async () => {
    const mockClients = [
      {
        name: 'maria',
        email: 'maria@email.com',
        phone: '0000',
        toObject: () => ({
          name: 'maria',
          email: 'maria@email.com',
          phone: '0000',
          id: 'a1',
        }),
      },
    ];

    (ClientModel.find as jest.Mock).mockResolvedValue(mockClients);

    const result = await repo.findAll();

    expect(ClientModel.find).toHaveBeenCalled();
    expect(result).toEqual([
      {
        name: 'maria',
        email: 'maria@email.com',
        phone: '0000',
        id: 'a1',
      },
    ]);
  });

  it('should call findByIdAndUpdate and return updated client', async () => {
    const updates = { name: 'novo nome' };
    const fakeUpdated = {
      name: 'novo nome',
      email: 'ana@email.com',
      phone: '9876',
      toObject: () => ({
        name: 'novo nome',
        email: 'ana@email.com',
        phone: '9876',
        id: '1',
      }),
    };

    (ClientModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(fakeUpdated);

    const result = await repo.update('1', updates);

    expect(ClientModel.findByIdAndUpdate).toHaveBeenCalledWith('1', updates, {
      new: true,
    });
    expect(result).toMatchObject({ name: 'novo nome' });
  });
});
