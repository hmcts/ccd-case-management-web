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
import { SearchResultViewItemComparatorFactory } from './search/sorting/search-result-view-item-comparator-factory';
import { CcdActivityComponent } from '../core/activity/ccd-activity/ccd-activity.component';
import { CcdActivityIconComponent } from '../core/activity/ccd-activity/ccd-activity-icon/ccd-activity-icon.component';
import { CcdActivityBannerComponent } from '../core/activity/ccd-activity/ccd-activity-banner/ccd-activity-banner.component';
import { CaseFieldService } from './domain/case-field.service';
import { CaseHistoryComponent } from './case-history/case-history.component';
import { CaseHistoryResolver } from './case-history/case-history.resolver';
import { LabelSubstitutorModule } from './substitutor/label-substitutor.module';
import { ConditionalShowModule } from './conditional-show/conditional-show.module';
import { CaseHistoryService } from '../core/cases/case-history.service';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';
import { DeleteOrCancelDialogComponent } from './delete-or-cancel-dialog/delete-or-cancel-dialog.component';
import { SaveOrDiscardDialogComponent } from './save-or-discard-dialog/save-or-discard-dialog.component';
import { MarkdownModule } from './markdown/markdown.module';
import { LabelFieldComponent } from './palette/label/label-field.component';
import { SharedUtilsModule } from './utils/shared-utils.module';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    PaletteModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EventTriggerModule,
    LabelSubstitutorModule,
    ConditionalShowModule,
    MarkdownModule,
    SharedUtilsModule,
  ],
  declarations: [
    SearchResultComponent,
    CaseHeaderComponent,
    EventTriggerHeaderComponent,
    SearchFiltersComponent,
    SortSearchResultPipe,
    CcdActivityComponent,
    CcdActivityIconComponent,
    CcdActivityBannerComponent,
    CaseHistoryComponent,
    DocumentDialogComponent,
    DeleteOrCancelDialogComponent,
    SaveOrDiscardDialogComponent,
    LabelFieldComponent,
  ],
  entryComponents: [
    DocumentDialogComponent,
    DeleteOrCancelDialogComponent,
    SaveOrDiscardDialogComponent,
    LabelFieldComponent
  ],
  providers: [
    SearchResultViewItemComparatorFactory,
    CaseFieldService,
    CaseHistoryResolver,
    CaseHistoryService,
  ],
  exports: [
    SearchResultComponent,
    CaseHeaderComponent,
    EventTriggerModule,
    EventTriggerHeaderComponent,
    SearchFiltersComponent,
    SharedUtilsModule,
    CcdActivityComponent,
    CcdActivityIconComponent,
    CcdActivityBannerComponent,
    CaseHistoryComponent,
  ]
})
export class SharedModule {}
