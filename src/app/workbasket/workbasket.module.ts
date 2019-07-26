import { NgModule } from '@angular/core';
import { WorkbasketComponent } from './workbasket.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CaseUIToolkitModule, WorkbasketFiltersModule, SearchResultModule } from '@hmcts/ccd-case-ui-toolkit';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    CaseUIToolkitModule,
    ReactiveFormsModule,
    WorkbasketFiltersModule,
    SearchResultModule
  ],
  declarations: [
    WorkbasketComponent
  ]
})
export class WorkbasketModule {}
