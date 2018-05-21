import { Injectable } from '@angular/core';
import { ConditionalShowDirective } from './conditional-show.directive';

@Injectable()
export class ConditionalShowRegistrarService {
  registeredDirectives = new Map<String, ConditionalShowDirective>();

  register(newDirective: ConditionalShowDirective) {
      // console.log('[', this.registeredDirectives.size, '] adding new directive', newDirective.caseField.id);
      if (!this.registeredDirectives.has(newDirective.caseField.id)) {
        this.registeredDirectives.set(newDirective.caseField.id, newDirective);
      }
  }

  refresh() {
    this.registeredDirectives.forEach(dir => {
      // console.log('refreshing ', dir.caseField.id);
      dir.refreshVisibility()
    });
  }
}
