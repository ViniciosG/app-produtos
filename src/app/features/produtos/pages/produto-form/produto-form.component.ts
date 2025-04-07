import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../../../../core/models/produto.model';
import { ProdutoService } from '../../../../core/services/produto.service';

@Component({
    selector: 'app-produto-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        CurrencyPipe
    ],
    template: `
        <h2 mat-dialog-title>{{ data ? 'Editar' : 'Novo' }} Produto</h2>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-dialog-content>
                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Nome</mat-label>
                    <input matInput formControlName="nome" placeholder="Digite o nome">
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Descrição</mat-label>
                    <textarea matInput formControlName="descricao" rows="3"></textarea>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Preço</mat-label>
                    <input matInput type="text" formControlName="preco" 
                           [value]="form.get('preco')?.value | currency:'BRL'"
                           (input)="formatarPreco($event)">
                    <span matPrefix>R$ </span>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Quantidade</mat-label>
                    <input matInput type="number" formControlName="quantidadeEstoque">
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Status</mat-label>
                    <mat-select formControlName="status">
                        <mat-option value="ATIVO">Ativo</mat-option>
                        <mat-option value="INATIVO">Inativo</mat-option>
                    </mat-select>
                </mat-form-field>
            </mat-dialog-content>

            <mat-dialog-actions align="end">
                <button mat-button mat-dialog-close>Cancelar</button>
                <button mat-raised-button color="primary" type="submit">Salvar</button>
            </mat-dialog-actions>
        </form>
    `,
    styles: [`
        .full-width {
            width: 100%;
            margin-bottom: 16px;
        }
    `]
})
export class ProdutoFormComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private produtoService: ProdutoService,
        private dialogRef: MatDialogRef<ProdutoFormComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data?: Produto
    ) {
        this.form = this.fb.group({
            nome: ['', Validators.required],
            descricao: ['', Validators.required],
            preco: [0, [Validators.required, Validators.min(0)]],
            quantidadeEstoque: [0, [Validators.required, Validators.min(0)]],
            status: ['ATIVO', Validators.required]
        });

        if (data) {
            this.form.patchValue(data);
        }
    }

    formatarPreco(event: Event): void {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');
        value = (Number(value) / 100).toString();
        this.form.get('preco')?.setValue(Number(value));
    }

    onSubmit(): void {
        if (this.form.valid) {
            const produto = this.form.value;
            const operation = this.data
                ? this.produtoService.atualizar(this.data.id, produto)
                : this.produtoService.criar(produto);

            operation.subscribe({
                next: () => {
                    this.snackBar.open('Produto salvo com sucesso!', 'Fechar', { duration: 3000 });
                    this.dialogRef.close(true);
                },
                error: () => {
                    this.snackBar.open('Erro ao salvar produto', 'Fechar', { duration: 3000 });
                }
            });
        }
    }
} 