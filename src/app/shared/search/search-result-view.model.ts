import { SearchResultViewColumn } from './search-result-view-column.model';
import { SearchResultViewItem } from './search-result-view-item.model';
import { Type } from 'class-transformer';
import { Draft } from '@hmcts/ccd-case-ui-toolkit';

export class SearchResultView {
  @Type(() => SearchResultViewColumn)
  columns: SearchResultViewColumn[];

  @Type(() => SearchResultViewItem)
  results: SearchResultViewItem[];
  result_error?: string;

  hasDrafts() {
    return this.results[0]
    && this.results[0].case_id
    && Draft.isDraft(this.results[0].case_id);
  }
}
