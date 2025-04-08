import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        SidebarComponent
    ],
    template: `
        <mat-sidenav-container class="sidenav-container">
            <mat-sidenav #drawer class="sidenav" fixedInViewport
                [mode]="'side'"
                [opened]="true">
                <app-sidebar></app-sidebar>
            </mat-sidenav>
            <mat-sidenav-content>
                <mat-toolbar color="primary">
                    <span>Sistema de Produtos</span>
                </mat-toolbar>
                <div class="content">
                    <router-outlet></router-outlet>
                </div>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `,
    styles: [`
        :host {
            display: block;
            height: 100vh;
        }
        .sidenav-container {
            height: 100%;
        }
        .sidenav {
            width: 250px;
        }
        .content {
            padding: 20px;
        }
    `]
})
export class LayoutComponent { } 