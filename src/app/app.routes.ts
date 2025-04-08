import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'categorias',
                loadChildren: () => import('./features/categorias/categorias.module').then(m => m.CategoriasModule)
            },
            {
                path: 'produtos',
                loadChildren: () => import('./features/produtos/produtos.module').then(m => m.ProdutosModule)
            },
            {
                path: '',
                redirectTo: 'produtos',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];
