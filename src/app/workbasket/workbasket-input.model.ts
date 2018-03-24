import { Orderable } from '../core/order/orderable.model';
import { Field } from '../core/search/field.model';

export class WorkbasketInputModel implements Orderable {
    constructor(
        public label: string,
        public order: number,
        public field: Field) { }
}
