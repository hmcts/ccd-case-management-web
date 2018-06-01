import { FeeValue } from './fee-value.model';

class OrderSummary {
    PaymentReference: string;
    Fees: FeeValue[];
    PaymentTotal: string;
}
