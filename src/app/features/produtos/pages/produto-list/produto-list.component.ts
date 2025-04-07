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
import { Produto } from '../../../../core/models/produto.model';
import { ProdutoService } from '../../../../core/services/produto.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ProdutoFormComponent } from '../produto-form/produto-form.component';

@Component({
    selector: 'app-produto-list',
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
                <h1>Produtos</h1>
                <button mat-flat-button color="primary" (click)="abrirForm()">
                    <mat-icon>add</mat-icon>
                    Novo Produto
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
                    <td mat-cell *matCellDef="let produto">{{produto.id}}</td>
                </ng-container>

                <ng-container matColumnDef="nome">
                    <th mat-header-cell *matHeaderCellDef>Nome</th>
                    <td mat-cell *matCellDef="let produto">{{produto.nome}}</td>
                </ng-container>

                <ng-container matColumnDef="descricao">
                    <th mat-header-cell *matHeaderCellDef>Descrição</th>
                    <td mat-cell *matCellDef="let produto">{{produto.descricao}}</td>
                </ng-container>

                <ng-container matColumnDef="preco">
                    <th mat-header-cell *matHeaderCellDef>Preço</th>
                    <td mat-cell *matCellDef="let produto">{{produto.preco | currency:'BRL'}}</td>
                </ng-container>

                <ng-container matColumnDef="quantidadeEstoque">
                    <th mat-header-cell *matHeaderCellDef>Estoque</th>
                    <td mat-cell *matCellDef="let produto">{{produto.quantidadeEstoque}}</td>
                </ng-container>

                <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let produto">
                        <span class="status-chip" [class.active]="produto.status === 'ATIVO'" [class.inactive]="produto.status === 'INATIVO'">
                            {{produto.status}}
                        </span>
                    </td>
                </ng-container>

                <ng-container matColumnDef="acoes">
                    <th mat-header-cell *matHeaderCellDef>Ações</th>
                    <td mat-cell *matCellDef="let produto" class="actions-cell">
                        <button mat-icon-button color="primary" (click)="editar(produto)" matTooltip="Editar">
                            <mat-icon>edit</mat-icon>
                        </button>
                        
                        <button mat-icon-button color="accent" 
                                (click)="alterarStatus(produto)"
                                [matTooltip]="produto.status === 'ATIVO' ? 'Inativar' : 'Ativar'">
                            <mat-icon>{{produto.status === 'ATIVO' ? 'toggle_on' : 'toggle_off'}}</mat-icon>
                        </button>
                        
                        <button mat-icon-button color="warn" (click)="excluir(produto)" matTooltip="Excluir">
                            <mat-icon>delete</mat-icon>
                        </button>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell" colspan="7">Nenhum resultado encontrado para "{{input.value}}"</td>
                </tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"
                          showFirstLastButtons
                          aria-label="Selecione a página de produtos">
            </mat-paginator>
        </div>
    `,
    styleUrls: ['../../../../shared/styles/table.scss']
})
export class ProdutoListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco', 'quantidadeEstoque', 'status', 'acoes'];
    dataSource = new MatTableDataSource<Produto>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private produtoService: ProdutoService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.carregarProdutos();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    carregarProdutos(): void {
        this.produtoService.listar().subscribe({
            next: (produtos) => {
                this.dataSource.data = produtos;
            },
            error: (error) => {
                console.error('Erro ao carregar produtos:', error);
                this.snackBar.open('Erro ao carregar produtos', 'Fechar', {
                    duration: 3000
                });
            }
        });
    }

    filtrar(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    abrirForm(produto?: Produto): void {
        const dialogRef = this.dialog.open(ProdutoFormComponent, {
            width: '600px',
            data: produto
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.carregarProdutos();
            }
        });
    }

    editar(produto: Produto): void {
        this.abrirForm(produto);
    }

    alterarStatus(produto: Produto): void {
        const operacao = produto.status === 'ATIVO'
            ? this.produtoService.inativar(produto.id)
            : this.produtoService.ativar(produto.id);

        operacao.subscribe({
            next: () => {
                this.snackBar.open(
                    `Produto ${produto.status === 'ATIVO' ? 'inativado' : 'ativado'} com sucesso!`,
                    'Fechar',
                    { duration: 3000 }
                );
                this.carregarProdutos();
            },
            error: (error) => {
                console.error('Erro ao alterar status do produto:', error);
                this.snackBar.open(
                    `Erro ao ${produto.status === 'ATIVO' ? 'inativar' : 'ativar'} produto`,
                    'Fechar',
                    { duration: 3000 }
                );
            }
        });
    }

    excluir(produto: Produto): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: 'Confirmar exclusão',
                message: `Deseja realmente excluir o produto ${produto.nome}?`
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.produtoService.deletar(produto.id).subscribe({
                    next: () => {
                        this.snackBar.open('Produto excluído com sucesso!', 'Fechar', {
                            duration: 3000
                        });
                        this.carregarProdutos();
                    },
                    error: (error) => {
                        console.error('Erro ao excluir produto:', error);
                        this.snackBar.open('Erro ao excluir produto', 'Fechar', {
                            duration: 3000
                        });
                    }
                });
            }
        });
    }
} 