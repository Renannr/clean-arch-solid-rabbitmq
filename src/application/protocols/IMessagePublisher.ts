export interface IMessagePublisher {
  publish(queue: string, message: unknown): Promise<void>;
}
