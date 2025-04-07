import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ProdutoFormComponent } from './pages/produto-form/produto-form.component';
import { ProdutoListComponent } from './pages/produto-list/produto-list.component';
import { ProdutosRoutingModule } from './produtos-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ProdutosRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSnackBarModule,
        ProdutoFormComponent,
        ProdutoListComponent
    ]
})
export class ProdutosModule { } 