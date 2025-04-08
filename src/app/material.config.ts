import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const materialConfig: ApplicationConfig = {
    providers: [
        provideAnimations()
    ]
}; 