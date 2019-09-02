import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NavigationNotifierService, NavigationOrigin } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'ccd-case-view-consumer',
  templateUrl: './case-view-consumer.component.html'
})
export class CaseViewConsumerComponent implements OnInit {
    caseId: string;
    callbackErrorsSubject: Subject<any> = new Subject();
    error: any;
    viewState: string;

    constructor(
        private route: ActivatedRoute,
        private navigationNotifier: NavigationNotifierService
    ) {}

    ngOnInit() {
        this.caseId = this.route.snapshot.params['cid'];
        this.viewState = 'caseView';
        this.route.fragment.subscribe(fragment => {
            console.log('fragment=' , fragment);
        });
        this.navigationNotifier.navigation.subscribe(navigation => {
            if (navigation === NavigationOrigin.EVENT_TRIGGERED) {
                this.viewState = 'eventTrigger';
            }
        });
    }

    isView() {
        return this.viewState === 'caseView';
    }

    isEventTrigger() {
        return this.viewState === 'eventTrigger';
    }
}
