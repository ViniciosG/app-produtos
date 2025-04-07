import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'categorias',
                loadChildren: () => import('./features/categorias/categorias.module')
                    .then(m => m.CategoriasModule)
            },
            {
                path: 'produtos',
                loadChildren: () => import('./features/produtos/produtos.module')
                    .then(m => m.ProdutosModule)
            },
            {
                path: '',
                redirectTo: 'produtos',
                pathMatch: 'full'
            }
        ]
    }
];
