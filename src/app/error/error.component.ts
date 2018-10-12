import { Component, OnInit } from '@angular/core';
import { HttpErrorService } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  templateUrl: './error.html'
})
export class ErrorComponent implements OnInit {

  private static readonly DEFAULT_HEADER = 'Oops! Something went wrong!';
  private static readonly DEFAULT_BODY = `It doesn't appear to have affected your data, but our technical staff have \
  been automatically notified and will be looking into this with the utmost urgency.`;
  header: String;
  body: String;

  constructor(private errorService: HttpErrorService) {}

  ngOnInit() {
    let error = this.errorService.removeError();
    this.header = error && error.message ? error.message : ErrorComponent.DEFAULT_HEADER;
    this.body = error && error.details ? error.details : ErrorComponent.DEFAULT_BODY;
  }

}
