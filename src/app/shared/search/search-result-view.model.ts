import { SearchResultViewColumn } from './search-result-view-column.model';
import { SearchResultViewItem } from './search-result-view-item.model';
import { CaseResolver } from '../../cases/case.resolver';
import { Type } from 'class-transformer';

export class SearchResultView {
  @Type(() => SearchResultViewColumn)
  columns: SearchResultViewColumn[];

  @Type(() => SearchResultViewItem)
  results: SearchResultViewItem[];
  result_error?: string;

  hasDrafts() {
    return this.results[0]
    && this.results[0].case_id
    && this.results[0].case_id.startsWith(CaseResolver.DRAFT);
  }
}
