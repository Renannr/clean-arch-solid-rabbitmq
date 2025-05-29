import { BaseEntity } from '../../shared/entities/BaseEntity';

export class ClientEntity extends BaseEntity {
  constructor(
    public name: string,
    public email: string,
    public phone: string
  ) {
    super();
  }
}