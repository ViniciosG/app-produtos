import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'categorias',
        loadChildren: () => import('./features/categorias/categorias.module').then(m => m.CategoriasModule)
    },
    {
        path: '',
        redirectTo: 'categorias',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { } 