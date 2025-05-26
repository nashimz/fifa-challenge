import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';

const isBrowser = typeof window !== 'undefined';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers!,
    ...(isBrowser
      ? provideAuth0({
          domain: 'dev-ouz7erckyjyswymx.us.auth0.com',
          clientId: 'Xv3eejCFJLv7URXQyPD5meUg4t5FsIdU',
          authorizationParams: {
            redirect_uri: window.location.origin,
          },
          cacheLocation: 'localstorage',
        })
      : []),
  ],
}).catch((err) => console.error(err));
