import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from 'src/app/app.routes';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { provideLoggedInUser } from 'src/app/auth/initializers/provide-logged-in-user';
import { setAuthTokenInterceptor } from 'src/app/auth/interceptors/set-auth-token-interceptor';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([setAuthTokenInterceptor])),
    provideEnvironmentNgxMask({
      thousandSeparator: '.',
      decimalMarker: ',',
    }),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      } as MatSnackBarConfig,
    },
    provideLoggedInUser(),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
};
