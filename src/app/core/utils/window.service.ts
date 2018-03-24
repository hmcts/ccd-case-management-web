import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {
  locationAssign(url: string): void {
    window.location.assign(url);
  }
}
