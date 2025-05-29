import amqp from 'amqplib';

export async function startConsumer(queue: string): Promise<void> {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    console.log(`>> \t Aguardando mensagens na fila "${queue}"`);

    channel.consume(queue, (msg) => {
      if (msg) {
        const content = msg.content.toString();
        console.log(`\t >>Mensagem recebida na fila "${queue}":`, content);
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('Erro ao iniciar consumidor:', err);
  }
}
