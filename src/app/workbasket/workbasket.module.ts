import { NgModule } from '@angular/core';
import { WorkbasketComponent } from './workbasket.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkbasketFiltersComponent } from './filters/workbasket-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CaseUIToolkitModule, SearchResultModule } from '@hmcts/ccd-case-ui-toolkit';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    CaseUIToolkitModule,
    ReactiveFormsModule,
    SearchResultModule
  ],
  declarations: [
    WorkbasketComponent,
    WorkbasketFiltersComponent
  ],
  exports: [
    WorkbasketFiltersComponent
  ]
})
export class WorkbasketModule {}
