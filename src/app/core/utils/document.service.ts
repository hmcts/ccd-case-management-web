import { Injectable } from '@angular/core';

@Injectable()
export class DocumentService {
  getUrl(): string {
    return document.URL;
  }
}
