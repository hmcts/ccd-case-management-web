import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '../../app.config';

@Pipe({
  name: 'ccdPrintUrl'
})
export class PrintUrlPipe implements PipeTransform {

  constructor(private appConfig: AppConfig) {}

  transform(value: string): string {
    return value.replace(this.appConfig.getRemotePrintServiceUrl(), this.appConfig.getPrintServiceUrl());
  }
}
