import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AuthHttpInterceptor, provideAuth0 } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const isBrowser = typeof window !== 'undefined';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers!,
    ...(isBrowser
      ? [
          provideAuth0({
            domain: 'dev-ouz7erckyjyswymx.us.auth0.com',
            clientId: 'Xv3eejCFJLv7URXQyPD5meUg4t5FsIdU',
            authorizationParams: {
              redirect_uri: window.location.origin,
              audience: 'http://localhost:3001/api/',
            },
            cacheLocation: 'localstorage',
            httpInterceptor: {
              allowedList: [
                {
                  uri: 'http://localhost:3001/api/*',
                  tokenOptions: {
                    authorizationParams: {
                      audience: 'http://localhost:3001/api/',
                    },
                  },
                },
              ],
            },
          }),
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
          },
        ]
      : []),
  ],
}).catch((err) => console.error(err));
