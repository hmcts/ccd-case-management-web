import { Input } from '@angular/core';
import { CaseField } from '../../domain/definition/case-field.model';
import { PaletteContext } from './palette-context.enum';
import { ContextMap } from '@hmcts/ccd-case-ui-toolkit';

export class AbstractFieldReadComponent {

  @Input()
  caseField: CaseField;

  @Input()
  caseViewContext: ContextMap;

  /**
   * Optional. Enable context-aware rendering of fields.
   */
  @Input()
  context: PaletteContext = PaletteContext.DEFAULT;
}
