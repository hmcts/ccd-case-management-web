import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchResultComponent } from './search/search-result.component';
import { SearchFiltersComponent } from './search/filters/search-filters.component';
import { PaletteModule, CaseFieldService, ConditionalShowModule, MarkdownModule,
  LabelSubstitutorModule, PipesModule, CaseReferencePipe, DialogsModule, CaseHeaderModule,
  ActivityModule, EventTriggerModule } from '@hmcts/ccd-case-ui-toolkit';
import { RouterModule } from '@angular/router';
import { EventTriggerHeaderComponent } from './header/event-trigger-header.component';
import { SortSearchResultPipe } from './search/sorting/sort-search-result.pipe';
import { SearchResultViewItemComparatorFactory } from './search/sorting/search-result-view-item-comparator-factory';
// import { CaseHistoryComponent } from './case-history/case-history.component';
// import { CaseHistoryResolver } from './case-history/case-history.resolver';
// import { CaseHistoryService } from '../core/cases/case-history.service';

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
    PipesModule,
    DialogsModule,
    CaseHeaderModule,
    ActivityModule,
  ],
  declarations: [
    SearchResultComponent,
    EventTriggerHeaderComponent,
    SearchFiltersComponent,
    SortSearchResultPipe,
    // CaseHistoryComponent,
  ],
  providers: [
    SearchResultViewItemComparatorFactory,
    CaseFieldService,
    // CaseHistoryResolver,
    // CaseHistoryService,
  ],
  exports: [
    SearchResultComponent,
    EventTriggerModule,
    EventTriggerHeaderComponent,
    SearchFiltersComponent,
    CaseReferencePipe,
    // CaseHistoryComponent,
  ]
})
export class SharedModule {}
