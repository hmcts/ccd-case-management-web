import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class JurisdictionService {

  private selectedJurisdictionSource = new Subject<Jurisdiction>();

  selectedJurisdiction = this.selectedJurisdictionSource.asObservable();

  announceSelectedJurisdiction(jurisdiction: Jurisdiction) {
    this.selectedJurisdictionSource.next(jurisdiction);
  }

}
