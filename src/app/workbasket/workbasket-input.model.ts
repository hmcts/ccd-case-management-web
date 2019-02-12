import { Orderable, Field } from '@hmcts/ccd-case-ui-toolkit';

export class WorkbasketInputModel implements Orderable {
    constructor(
      public label: string,
      public order: number,
      public field: Field,
      public metadata?: boolean) {
    }
}

export class WorkbasketInput {
  public workbasketInputs: WorkbasketInputModel[]
}
