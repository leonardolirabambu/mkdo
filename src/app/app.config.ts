import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorInterceptor } from './core/interceptors/interceptor.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorInterceptor,
        multi: true
    },
    provideRouter(routes),
    importProvidersFrom(CookieService, HttpClientModule, NgxLoadingModule.forRoot({
        animationType: ngxLoadingAnimationTypes.wanderingCubes,
        backdropBackgroundColour: "rgba(255,87,51,1)",
        backdropBorderRadius: "4px",
        primaryColour: "#FF5733",
        secondaryColour: "#FF5733",
        tertiaryColour: "#FF5733",
    })),
    provideClientHydration(),
    provideAnimations(),
    provideAnimations()
]
};
