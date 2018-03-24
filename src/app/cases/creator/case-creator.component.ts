import { Component, OnInit } from '@angular/core';
import { Profile } from '../../core/profile/profile.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'case-creator.component.html'
})
export class CaseCreatorComponent implements OnInit {

  profile: Profile;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.profile = this.route.parent.parent.snapshot.data.profile;
  }

}
