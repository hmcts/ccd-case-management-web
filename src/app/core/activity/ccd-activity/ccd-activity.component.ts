import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Activity, ActivityInfo, DisplayMode } from '../activity.model';
import { ActivityPollingService } from '../activity.polling.service';

@Component({
  selector: 'ccd-activity',
  templateUrl: './ccd-activity.component.html',
  styleUrls: ['./ccd-activity.component.css']
})
export class CcdActivityComponent implements OnInit, OnDestroy {
  private VIEWERS_PREFIX = '';
  private VIEWERS_SUFFIX = 'viewing this case.';
  private EDITORS_PREFIX = 'This case is locked because ';
  private EDITORS_SUFFIX = 'working on this.';
  activity: Activity;
  dspMode = DisplayMode;

  viewersText: string;
  editorsText: string;

  @Input()
  public caseId: string;

  @Input()
  displayMode: DisplayMode;

  constructor(private activityPollingService: ActivityPollingService) {}

  ngOnInit() {
    this.activity = new Activity();
    this.activity.caseId = this.caseId;
    this.activity.editors = [];
    this.activity.unknownEditors = 0;
    this.activity.viewers = [];
    this.activity.unknownViewers = 0;
    this.viewersText = '';
    this.editorsText = '';
    this.activityPollingService.subscribeToActivity(this.caseId, newActivity => this.onActivityChange(newActivity));
  }

  onActivityChange(newActivity: Activity) {
    this.activity = newActivity;
    this.viewersText = this.generateDescription(this.VIEWERS_PREFIX,
      this.VIEWERS_SUFFIX,
      this.activity.viewers,
      this.activity.unknownViewers);
    this.editorsText = this.generateDescription(this.EDITORS_PREFIX,
      this.EDITORS_SUFFIX,
      this.activity.editors,
      this.activity.unknownEditors);
  }

  isActivityEnabled() {
    return this.activityPollingService.isEnabled;
  }

  isActiveCase() {
    return this.activity.editors.length || this.activity.viewers.length || this.activity.unknownEditors || this.activity.unknownViewers;
  }

  ngOnDestroy() {
    this.activityPollingService.unsubscribeFromActivity(this.caseId);
  }

  generateDescription(prefix: string, suffix: string, namesArray: Array<ActivityInfo>, unknownCount) {
    let resultText = prefix;
    resultText += namesArray.map(activityInfo => activityInfo.forename + ' ' + activityInfo.surname).join(', ');
    if (unknownCount > 0) {
      resultText += (namesArray.length > 0 ? ' and ' + unknownCount + ' other' : unknownCount + ' user');
      resultText += ( unknownCount > 1 ? 's' : '');
    }
    if (namesArray.length + unknownCount > 1) {
      resultText += ' are ' + suffix;
    } else {
      resultText += ' is ' + suffix;
    }
    return resultText;
  }
}
