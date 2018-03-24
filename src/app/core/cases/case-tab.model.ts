import { CaseField } from '../../shared/domain/definition/case-field.model';
import { Orderable } from '../order/orderable.model';

export class CaseTab implements Orderable {
  id: string;
  label: string;
  order?: number;
  fields: CaseField[];
}
