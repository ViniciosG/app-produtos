import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaListComponent } from './pages/categoria-list/categoria-list.component';

const routes: Routes = [
    {
        path: '',
        component: CategoriaListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriasRoutingModule { } 