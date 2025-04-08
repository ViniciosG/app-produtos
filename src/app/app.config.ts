import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { materialConfig } from './material.config';

export const appConfig: ApplicationConfig = mergeApplicationConfig(
  materialConfig,
  {
    providers: [
      provideRouter(routes),
      provideHttpClient(
        withInterceptors([authInterceptor])
      )
    ]
  }
);
