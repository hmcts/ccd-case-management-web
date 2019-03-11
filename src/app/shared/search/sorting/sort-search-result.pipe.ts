import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from 'util';
import { SortParameters } from './sort-parameters';
import { SortOrder } from './sort-order';
import { SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';

@Pipe({
  name: 'ccdSortSearchResult'
})
export class SortSearchResultPipe implements PipeTransform {

  transform(searchResults: SearchResultViewItem[], sortParameters: SortParameters) {

    if (isUndefined(searchResults) || isUndefined(sortParameters)) {
      return searchResults;
    }
    return searchResults.sort(
      function (a, b) {
        return sortParameters.comparator.compare(a, b)
                  * (sortParameters.sortOrder === SortOrder.DESCENDING ? 1 : -1);
      }
    );
  }

}
