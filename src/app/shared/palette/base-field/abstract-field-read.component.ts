import { Input } from '@angular/core';
import { CaseField } from '../../domain/definition/case-field.model';
import { PaletteContext } from './palette-context.enum';

export class AbstractFieldReadComponent {
  public static genericInputs: string[] = ['caseField', 'context'];

  @Input()
  caseField: CaseField;

  /**
   * Optional. Enable context-aware rendering of fields.
   */
  @Input()
  context: PaletteContext = PaletteContext.DEFAULT;
}
