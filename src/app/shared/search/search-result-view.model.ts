import { SearchResultViewColumn } from './search-result-view-column.model';
import { SearchResultViewItem } from './search-result-view-item.model';

export class SearchResultView {
  columns: SearchResultViewColumn[];
  results: SearchResultViewItem[];
}
