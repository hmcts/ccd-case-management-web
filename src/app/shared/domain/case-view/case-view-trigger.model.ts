import { Orderable } from '../../../core/order/orderable.model';

export class CaseViewTrigger implements Orderable {
  public static readonly DELETE = 'DELETE';

  id: string;
  name: string;
  description: string;
  order?: number;
}
