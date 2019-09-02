import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ccd-case-view-consumer',
  templateUrl: './case-view-consumer.component.html'
})
export class CaseViewConsumerComponent implements OnInit {
    caseId: string;

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.caseId = this.route.snapshot.params['cid'];
    }
}
