import { Injectable } from '@angular/core';

@Injectable()
export class EventStatusService {
  private static readonly CALLBACK_STATUS_INCOMPLETE = 'INCOMPLETE';

  public static isIncomplete (eventStatus: string) {
    if (!eventStatus) {
      return false;
    }
    return EventStatusService.CALLBACK_STATUS_INCOMPLETE === eventStatus;
  }
}
