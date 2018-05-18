import { Injectable } from '@angular/core';
import { ConditionalShowDirective } from './conditional-show.directive';

@Injectable()
export class ConditionalShowRegistrarService {
    private registeredDirectives = [];

    register(newDirective: ConditionalShowDirective) {
        if (!this.registeredDirectives.includes(newDirective)) {
            // console.log('adding new directive', newDirective.caseField.id);
            this.registeredDirectives.push(newDirective);
        }
    }

    refresh() {
        this.registeredDirectives.forEach(dir => dir.refreshVisibility());
    }
}
