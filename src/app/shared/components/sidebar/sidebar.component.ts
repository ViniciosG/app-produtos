import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatListModule,
        MatIconModule
    ],
    template: `
        <mat-nav-list>
            <a mat-list-item routerLink="/produtos" routerLinkActive="active">
                <mat-icon matListItemIcon>inventory_2</mat-icon>
                <span matListItemTitle>Produtos</span>
            </a>
            <a mat-list-item routerLink="/categorias" routerLinkActive="active">
                <mat-icon matListItemIcon>category</mat-icon>
                <span matListItemTitle>Categorias</span>
            </a>
        </mat-nav-list>
    `,
    styles: [`
        .active {
            background-color: rgba(0, 0, 0, 0.1);
        }
        mat-nav-list {
            padding-top: 1rem;
        }
    `]
})
export class SidebarComponent { } 