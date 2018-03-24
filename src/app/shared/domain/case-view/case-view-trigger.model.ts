import { Orderable } from '../../../core/order/orderable.model';

export class CaseViewTrigger implements Orderable {
  id: string;
  name: string;
  description: string;
  order?: number;
}
