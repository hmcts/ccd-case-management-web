import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchResultComponent } from './search/search-result.component';
import { SearchFiltersComponent } from './search/filters/search-filters.component';
import { PaletteModule } from './palette/palette.module';
import { RouterModule } from '@angular/router';
import { EventTriggerModule } from './event-trigger/event-trigger.module';
import { CaseHeaderComponent } from './header/case-header.component';
import { EventTriggerHeaderComponent } from './header/event-trigger-header.component';
import { SortSearchResultPipe } from './search/sorting/sort-search-result.pipe';
import { CaseReferencePipe } from './utils/case-reference.pipe';
import { SearchResultViewItemComparatorFactory } from './search/sorting/search-result-view-item-comparator-factory';
import { CcdActivityComponent } from '../core/activity/ccd-activity/ccd-activity.component';
import { CcdActivityIconComponent } from '../core/activity/ccd-activity/ccd-activity-icon/ccd-activity-icon.component';
import { CcdActivityBannerComponent } from '../core/activity/ccd-activity/ccd-activity-banner/ccd-activity-banner.component';
import { CaseFieldService } from './domain/case-field.service';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    PaletteModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EventTriggerModule
  ],
  declarations: [
    SearchResultComponent,
    CaseHeaderComponent,
    EventTriggerHeaderComponent,
    SearchFiltersComponent,
    SortSearchResultPipe,
    CaseReferencePipe,
    CcdActivityComponent,
    CcdActivityIconComponent,
    CcdActivityBannerComponent,
    DocumentDialogComponent,
  ],
  entryComponents: [DocumentDialogComponent],
  providers: [
    SearchResultViewItemComparatorFactory,
    CaseFieldService
  ],
  exports: [
    SearchResultComponent,
    CaseHeaderComponent,
    EventTriggerModule,
    EventTriggerHeaderComponent,
    SearchFiltersComponent,
    CaseReferencePipe,
    CcdActivityComponent,
    CcdActivityIconComponent,
    CcdActivityBannerComponent,
  ]
})
export class SharedModule {}
