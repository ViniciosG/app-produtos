import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
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
                redirectTo: 'categorias',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { } 