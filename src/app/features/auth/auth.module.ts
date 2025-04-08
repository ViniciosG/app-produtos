import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginComponent,
        RouterModule.forChild([
            { path: 'login', component: LoginComponent }
        ])
    ],
    exports: [LoginComponent]
})
export class AuthModule { } 