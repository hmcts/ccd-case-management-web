import { Injectable } from '@angular/core';
import { Orderable } from './orderable.model';

@Injectable()
export class OrderService {

  /**
   * @deprecated Use `sort` function instead or `compareAsc`
   * @type {(a:Orderable, b:Orderable)=>number}
   */
  sortAsc = this.compareAsc;

  /**
   * Clone and sort array. Ascending order used by default.
   *
   * @param array Array to sort
   * @returns {Orderable[]} Sorted clone array.
   */
  sort<T extends Orderable>(array: T[]): T[] {
    return array
      .slice(0)
      .sort(this.compareAsc);
  }

  compareAsc(a: Orderable, b: Orderable): number {
    let aOrdered = a.order === 0 || a.order;
    let bOrdered = b.order === 0 || b.order;

    if (!aOrdered) {
      return !bOrdered ? 0 : 1;
    }

    if (!bOrdered) {
      return -1;
    }

    return a.order - b.order;
  }
}
