import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Categoria, CategoriaRequest } from '../../../../core/models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

@Component({
    selector: 'app-categoria-form',
    templateUrl: './categoria-form.component.html',
    styleUrls: ['./categoria-form.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    standalone: true
})
export class CategoriaFormComponent implements OnInit {
    form: FormGroup;
    isEdit = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CategoriaFormComponent>,
        private categoriaService: CategoriaService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data?: Categoria
    ) {
        this.form = this.fb.group({
            nome: ['', [Validators.required, Validators.minLength(3)]],
            descricao: ['', [Validators.required, Validators.minLength(10)]]
        });

        if (data) {
            this.isEdit = true;
            this.form.patchValue(data);
        }
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.form.valid) {
            const categoria: CategoriaRequest = this.form.value;

            const operacao = this.isEdit
                ? this.categoriaService.atualizar(this.data!.id, categoria)
                : this.categoriaService.criar(categoria);

            operacao.subscribe({
                next: () => {
                    this.snackBar.open(
                        `Categoria ${this.isEdit ? 'atualizada' : 'criada'} com sucesso`,
                        'Fechar',
                        { duration: 3000 }
                    );
                    this.dialogRef.close(true);
                },
                error: () => {
                    this.snackBar.open(
                        `Erro ao ${this.isEdit ? 'atualizar' : 'criar'} categoria`,
                        'Fechar',
                        { duration: 3000 }
                    );
                }
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
} 