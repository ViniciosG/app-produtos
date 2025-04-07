import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Categoria } from '../../../../core/models/categoria.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';

@Component({
    selector: 'app-categoria-list',
    templateUrl: './categoria-list.component.html',
    styleUrls: ['./categoria-list.component.scss'],
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatChipsModule,
        MatMenuModule
    ],
    standalone: true
})
export class CategoriaListComponent implements OnInit {
    categorias: Categoria[] = [];
    displayedColumns: string[] = ['nome', 'descricao', 'status', 'dataHoraRegistro', 'acoes'];

    constructor(
        private categoriaService: CategoriaService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.carregarCategorias();
    }

    carregarCategorias(): void {
        this.categoriaService.listar().subscribe({
            next: (categorias) => {
                this.categorias = categorias;
            },
            error: (error) => {
                this.snackBar.open('Erro ao carregar categorias', 'Fechar', { duration: 3000 });
            }
        });
    }

    abrirForm(categoria?: Categoria): void {
        const dialogRef = this.dialog.open(CategoriaFormComponent, {
            width: '500px',
            data: categoria
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.carregarCategorias();
            }
        });
    }

    alterarStatus(categoria: Categoria): void {
        const acao = categoria.status === 'ATIVA' ? 'inativar' : 'ativar';
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Confirmar ação',
                message: `Deseja realmente ${acao} a categoria ${categoria.nome}?`
            }
        });

        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                const operacao = categoria.status === 'ATIVA'
                    ? this.categoriaService.inativar(categoria.id)
                    : this.categoriaService.ativar(categoria.id);

                operacao.subscribe({
                    next: () => {
                        this.snackBar.open(`Categoria ${acao}da com sucesso`, 'Fechar', { duration: 3000 });
                        this.carregarCategorias();
                    },
                    error: () => {
                        this.snackBar.open(`Erro ao ${acao} categoria`, 'Fechar', { duration: 3000 });
                    }
                });
            }
        });
    }

    deletar(categoria: Categoria): void {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Confirmar exclusão',
                message: `Deseja realmente excluir a categoria ${categoria.nome}?`
            }
        });

        confirmDialog.afterClosed().subscribe(result => {
            if (result) {
                this.categoriaService.deletar(categoria.id).subscribe({
                    next: () => {
                        this.snackBar.open('Categoria excluída com sucesso', 'Fechar', { duration: 3000 });
                        this.carregarCategorias();
                    },
                    error: () => {
                        this.snackBar.open('Erro ao excluir categoria', 'Fechar', { duration: 3000 });
                    }
                });
            }
        });
    }
} 