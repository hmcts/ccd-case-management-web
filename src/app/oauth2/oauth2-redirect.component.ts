import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuth2Service } from '../core/auth/oauth2.service';

@Component({
  templateUrl: './oauth2-redirect.html',
  styleUrls: [
    './oauth2-redirect.scss'
  ]
})
export class OAuth2RedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private oauth2Service: OAuth2Service, private router: Router) {}
  ngOnInit(): void {
    this.oauth2Service.getAccessToken(this.route.snapshot.queryParams.code).subscribe(() => {
      // Navigate to / (index)
      this.router.navigate(['/'], { replaceUrl: true });
    }, error => {
      console.error(error);
    });
  }
}
