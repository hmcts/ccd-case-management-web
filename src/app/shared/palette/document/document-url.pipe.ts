import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '../../../app.config';

@Pipe({
  name: 'ccdDocumentUrl'
})
export class DocumentUrlPipe implements PipeTransform {

  constructor(private appConfig: AppConfig) {}

  transform(value: string): string {
    return value.replace(this.appConfig.getRemoteDocumentManagementUrl(), this.appConfig.getDocumentManagementUrl());
  }
}
