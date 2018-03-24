import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ccdCaseReference'
})
export class CaseReferencePipe implements PipeTransform {

  transform(caseReference: string): string {
    return caseReference.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  }
}
