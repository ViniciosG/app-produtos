import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Categoria } from '../../../../core/models/categoria.model';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';

@Component({
    selector: 'app-categoria-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule
    ],
    template: `
        <div class="table-container">
            <div class="table-header">
                <h1>Categorias</h1>
                <button mat-flat-button color="primary" (click)="abrirForm()">
                    <mat-icon>add</mat-icon>
                    Nova Categoria
                </button>
            </div>

            <div class="table-filters">
                <mat-form-field>
                    <mat-label>Buscar</mat-label>
                    <input matInput (keyup)="filtrar($event)" placeholder="Digite para buscar..." #input>
                    <mat-icon matSuffix>search</mat-icon>
                </mat-form-field>
            </div>

            <table mat-table [dataSource]="dataSource">
                <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef>ID</th>
                    <td mat-cell *matCellDef="let categoria">{{categoria.id}}</td>
                </ng-container>

                <ng-container matColumnDef="nome">
                    <th mat-header-cell *matHeaderCellDef>Nome</th>
                    <td mat-cell *matCellDef="let categoria">{{categoria.nome}}</td>
                </ng-container>

                <ng-container matColumnDef="descricao">
                    <th mat-header-cell *matHeaderCellDef>Descrição</th>
                    <td mat-cell *matCellDef="let categoria">{{categoria.descricao}}</td>
                </ng-container>

                <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let categoria">
                        <span class="status-chip" [class.active]="categoria.status === 'ATIVA'" [class.inactive]="categoria.status === 'INATIVA'">
                            {{categoria.status}}
                        </span>
                    </td>
                </ng-container>

                <ng-container matColumnDef="acoes">
                    <th mat-header-cell *matHeaderCellDef>Ações</th>
                    <td mat-cell *matCellDef="let categoria" class="actions-cell">
                        <button mat-icon-button color="primary" (click)="editar(categoria)" matTooltip="Editar">
                            <mat-icon>edit</mat-icon>
                        </button>
                        
                        <button mat-icon-button color="accent" 
                                (click)="alterarStatus(categoria)"
                                [matTooltip]="categoria.status === 'ATIVA' ? 'Inativar' : 'Ativar'">
                            <mat-icon>{{categoria.status === 'ATIVA' ? 'toggle_on' : 'toggle_off'}}</mat-icon>
                        </button>
                        
                        <button mat-icon-button color="warn" (click)="excluir(categoria)" matTooltip="Excluir">
                            <mat-icon>delete</mat-icon>
                        </button>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell" colspan="5">Nenhum resultado encontrado para "{{input.value}}"</td>
                </tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"
                          showFirstLastButtons
                          aria-label="Selecione a página de categorias">
            </mat-paginator>
        </div>
    `,
    styleUrls: ['../../../../shared/styles/table.scss']
})
export class CategoriaListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'descricao', 'status', 'acoes'];
    dataSource = new MatTableDataSource<Categoria>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private categoriaService: CategoriaService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.carregarCategorias();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    carregarCategorias(): void {
        this.categoriaService.listar().subscribe({
            next: (categorias) => {
                this.dataSource.data = categorias;
            },
            error: (error) => {
                console.error('Erro ao carregar categorias:', error);
                this.snackBar.open('Erro ao carregar categorias', 'Fechar', {
                    duration: 3000
                });
            }
        });
    }

    filtrar(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    abrirForm(categoria?: Categoria): void {
        const dialogRef = this.dialog.open(CategoriaFormComponent, {
            width: '600px',
            data: categoria
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.carregarCategorias();
            }
        });
    }

    editar(categoria: Categoria): void {
        this.abrirForm(categoria);
    }

    alterarStatus(categoria: Categoria): void {
        const operacao = categoria.status === 'ATIVA'
            ? this.categoriaService.inativar(categoria.id)
            : this.categoriaService.ativar(categoria.id);

        operacao.subscribe({
            next: () => {
                this.snackBar.open(
                    `Categoria ${categoria.status === 'ATIVA' ? 'inativada' : 'ativada'} com sucesso!`,
                    'Fechar',
                    { duration: 3000 }
                );
                this.carregarCategorias();
            },
            error: (error) => {
                console.error('Erro ao alterar status da categoria:', error);
                this.snackBar.open(
                    `Erro ao ${categoria.status === 'ATIVA' ? 'inativar' : 'ativar'} categoria`,
                    'Fechar',
                    { duration: 3000 }
                );
            }
        });
    }

    excluir(categoria: Categoria): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: 'Confirmar exclusão',
                message: `Deseja realmente excluir a categoria ${categoria.nome}?`
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.categoriaService.deletar(categoria.id).subscribe({
                    next: () => {
                        this.snackBar.open('Categoria excluída com sucesso!', 'Fechar', {
                            duration: 3000
                        });
                        this.carregarCategorias();
                    },
                    error: (error) => {
                        console.error('Erro ao excluir categoria:', error);
                        this.snackBar.open('Erro ao excluir categoria', 'Fechar', {
                            duration: 3000
                        });
                    }
                });
            }
        });
    }
} 