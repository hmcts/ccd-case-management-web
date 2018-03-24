import { Orderable } from '../../../core/order/orderable.model';

export class CaseState implements Orderable {
  id: string;
  name: string;
  description: string;
  order?: number;
}
