import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuth2Service } from '../core/auth/oauth2.service';
import { AuthService } from '../core/auth/auth.service';

@Component({
  templateUrl: './oauth2-redirect.html',
  styleUrls: [
    './oauth2-redirect.scss'
  ]
})
export class OAuth2RedirectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private oauth2Service: OAuth2Service,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let oauth2Code = this.route.snapshot.queryParams.code;

    if (oauth2Code) {
      this.oauth2Service.getAccessToken(oauth2Code).subscribe(() => {
        // Navigate to / (index)
        this.router.navigate(['/'], { replaceUrl: true });
      }, error => {
        console.error(error);
      });
    } else {
      this.authService.signIn();
    }
  }
}
