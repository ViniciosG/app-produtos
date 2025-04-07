import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../../../core/models/categoria.model';
import { CategoriaService } from '../../../../core/services/categoria.service';

@Component({
    selector: 'app-categoria-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    template: `
        <h2 mat-dialog-title>{{ data ? 'Editar' : 'Nova' }} Categoria</h2>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-dialog-content>
                <mat-form-field appearance="outline" class="full-width">
                    <mat-label class="required-field">Nome</mat-label>
                    <input matInput formControlName="nome" placeholder="Digite o nome">
                    <mat-error *ngIf="form.get('nome')?.errors?.['required']">
                        Nome é obrigatório
                    </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                    <mat-label class="required-field">Descrição</mat-label>
                    <textarea matInput formControlName="descricao" placeholder="Digite a descrição" rows="3"></textarea>
                    <mat-error *ngIf="form.get('descricao')?.errors?.['required']">
                        Descrição é obrigatória
                    </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                    <mat-label class="required-field">Status</mat-label>
                    <mat-select formControlName="status">
                        <mat-option value="ATIVA">Ativa</mat-option>
                        <mat-option value="INATIVA">Inativa</mat-option>
                    </mat-select>
                    <mat-error *ngIf="form.get('status')?.errors?.['required']">
                        Status é obrigatório
                    </mat-error>
                </mat-form-field>
            </mat-dialog-content>

            <mat-dialog-actions align="end">
                <button mat-button mat-dialog-close type="button">Cancelar</button>
                <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
                    {{ data ? 'Atualizar' : 'Criar' }}
                </button>
            </mat-dialog-actions>
        </form>
    `,
    styles: [`
        .full-width {
            width: 100%;
            margin-bottom: 15px;
        }
    `]
})
export class CategoriaFormComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private categoriaService: CategoriaService,
        private dialogRef: MatDialogRef<CategoriaFormComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data?: Categoria
    ) {
        this.form = this.fb.group({
            nome: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
            status: ['ATIVA', [Validators.required]]
        });
    }

    ngOnInit(): void {
        if (this.data) {
            this.form.patchValue(this.data);
        }
    }

    onSubmit(): void {
        if (this.form.valid) {
            const categoria = this.form.value;

            if (this.data) {
                this.categoriaService.atualizar(this.data.id, categoria).subscribe({
                    next: () => {
                        this.snackBar.open('Categoria atualizada com sucesso!', 'Fechar', {
                            duration: 3000
                        });
                        this.dialogRef.close(true);
                    },
                    error: (error) => {
                        console.error('Erro ao atualizar categoria:', error);
                        this.snackBar.open('Erro ao atualizar categoria', 'Fechar', {
                            duration: 3000
                        });
                    }
                });
            } else {
                this.categoriaService.criar(categoria).subscribe({
                    next: () => {
                        this.snackBar.open('Categoria criada com sucesso!', 'Fechar', {
                            duration: 3000
                        });
                        this.dialogRef.close(true);
                    },
                    error: (error) => {
                        console.error('Erro ao criar categoria:', error);
                        this.snackBar.open('Erro ao criar categoria', 'Fechar', {
                            duration: 3000
                        });
                    }
                });
            }
        }
    }
} 