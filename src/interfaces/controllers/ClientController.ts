import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../application/use-cases/CreateClientUseCase';
import { GetClientByIdUseCase } from '../../application/use-cases/GetClientByIdUseCase';
import { ListClientsUseCase } from '../../application/use-cases/ListClientUseCase';
import { UpdateClientUseCase } from '../../application/use-cases/UpdateClientUseCase';

export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private listClientsUseCase: ListClientsUseCase,
    private getClientByIdUseCase: GetClientByIdUseCase,
    private updateClientUseCase: UpdateClientUseCase,
  ) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const client = await this.createClientUseCase.execute(req.body);
      return res.status(201).json(client);
    } catch (error) {
      console.error('[CreateClient] Erro:', error);
      return res.status(400).json({ error: 'Erro ao criar cliente' });
    }
  };

  findAll = async (_: Request, res: Response): Promise<Response> => {
    try {
      const clients = await this.listClientsUseCase.execute();
      return res.status(200).json(clients);
    } catch (error) {
      console.error('[ListClients] Erro:', error);
      return res.status(400).json({ error: 'Erro ao listar clientes' });
    }
  };

  findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const client = await this.getClientByIdUseCase.execute(req.params.id);
      if (!client) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      return res.status(200).json(client);
    } catch (error: unknown) {
      console.error('[GetClientById] Erro:', error);
      if (
        error instanceof Error &&
        error.message === 'Cliente não encontrado'
      ) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({ error: 'Erro ao buscar cliente' });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const updated = await this.updateClientUseCase.execute(
        req.params.id,
        req.body,
      );
      return res.status(200).json(updated);
    } catch (error: unknown) {
      console.error('[UpdateClient] Erro:', error);
      if (
        error instanceof Error &&
        error.message === 'Cliente não encontrado'
      ) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Erro ao atualizar cliente' });
    }
  };
}
