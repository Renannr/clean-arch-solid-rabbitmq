import { Request, Response, Router } from 'express';
import { CreateClientUseCase } from '../../application/use-cases/CreateClientUseCase';
import { GetClientByIdUseCase } from '../../application/use-cases/GetClientByIdUseCase';
import { ListClientsUseCase } from '../../application/use-cases/ListClientUseCase';
import { UpdateClientUseCase } from '../../application/use-cases/UpdateClientUseCase';
import { ClientController } from '../../interfaces/controllers/ClientController';
import { ClientRepository } from '../database/mongodb/ClientRepository';
import { RabbitMQPublisher } from '../messaging/RabbitMQPublisher';

const router = Router();

const repo = new ClientRepository();
const publisher = new RabbitMQPublisher();

const clientController = new ClientController(
  new CreateClientUseCase(repo, publisher),
  new ListClientsUseCase(repo),
  new GetClientByIdUseCase(repo),
  new UpdateClientUseCase(repo)
);

router.get('/health', (_, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

router
  .post('/clientes', (req: Request, res: Response) => { clientController.create(req, res) })
  .get('/clientes', (req: Request, res: Response) => { clientController.findAll(req, res) })
  .get('/clientes/:id', (req: Request, res: Response) => { clientController.findById(req, res) })
  .put('/clientes/:id', (req: Request, res: Response) => { clientController.update(req, res) })

export default router;