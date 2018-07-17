import { SearchResultViewColumn } from './search-result-view-column.model';
import { SearchResultViewItem } from './search-result-view-item.model';
import { CaseResolver } from '../../cases/case.resolver';

export class SearchResultView {
  columns: SearchResultViewColumn[];
  results: SearchResultViewItem[];
  result_error?: string;

  hasDrafts() {
    return this.results[0]
    && this.results[0].case_id
    && this.results[0].case_id.startsWith(CaseResolver.DRAFT);
  }
}
