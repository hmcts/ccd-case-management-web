import { Pipe, PipeTransform } from '@angular/core';
import { CaseResolver } from '../../cases/case.resolver';

@Pipe({
  name: 'ccdCaseReference'
})
export class CaseReferencePipe implements PipeTransform {

  transform(caseReference: string): string {
    if (caseReference.length < 16) {
      return 'DRAFT';
    } else {
      return caseReference.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
    }
  }
}
