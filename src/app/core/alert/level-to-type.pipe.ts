import { Pipe, PipeTransform } from '@angular/core';
import { AlertLevel } from '@hmcts/ccd-case-ui-toolkit';

@Pipe({
  name: 'ccdLevelToType'
})
export class LevelToTypePipe implements PipeTransform {

  transform(level: AlertLevel): string {
    switch (level) {
      case 'success':
        return 'success';
      case 'message':
        return 'message';
      case 'error':
        return 'error';
      default:
        return 'warning';
    }
  }
}
