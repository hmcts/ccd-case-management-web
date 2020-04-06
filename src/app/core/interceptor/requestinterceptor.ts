import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable()
export class RequestInterceptor  implements HttpInterceptor {

constructor(@Optional() @Inject(REQUEST) protected request?: Request) {}

intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('In intercept Method');
    let serverReq = req;
    if (this.request) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      if (!req.url.startsWith('/')) {
        newUrl += '/';
      }
      newUrl += req.url;
      console.log('In intercept Method newURL ' + newUrl);
      serverReq = req.clone({url: newUrl});
    }
    console.log('In intercept Method End');
    return next.handle(serverReq);
  }
}
