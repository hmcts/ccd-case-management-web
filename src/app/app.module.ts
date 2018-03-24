import { APP_INITIALIZER, ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { WorkbasketModule } from './workbasket/workbasket.module';
import { SearchModule } from './search/search.module';
import { routing } from './app.routing';

import { createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { CasesModule } from './cases/cases.module';
import { AppConfig } from './app.config';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from './shared/shared.module';
import { OAuth2RedirectModule } from './oauth2/oauth2-redirect.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    CoreModule,
    WorkbasketModule,
    SearchModule,
    CasesModule,
    SharedModule,
    OAuth2RedirectModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
