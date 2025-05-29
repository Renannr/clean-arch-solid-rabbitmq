import amqp from 'amqplib';
import { IMessagePublisher } from '../../application/protocols/IMessagePublisher';

export class RabbitMQPublisher implements IMessagePublisher {
  async publish(queue: string, message: unknown): Promise<void> {
    try {
      const connection = await amqp.connect(
        process.env.RABBITMQ_URL || 'amqp://localhost',
      );
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, { durable: true });

      const payload = Buffer.from(JSON.stringify(message));
      channel.sendToQueue(queue, payload);

      console.log(`Mensagem enviada para a fila "${queue}"`);

      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Erro ao publicar mensagem:', error);
    }
  }
}
