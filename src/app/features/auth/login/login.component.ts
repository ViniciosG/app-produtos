import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginRequest } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
        <div class="login-container">
            <div class="login-card">
                <h2>Login</h2>
                
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                        <label for="username">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            formControlName="username"
                            class="form-control"
                            [ngClass]="{'is-invalid': loginForm.get('username')?.invalid && loginForm.get('username')?.touched}"
                        >
                        <div class="invalid-feedback" *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
                            Usuário é obrigatório
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            formControlName="password"
                            class="form-control"
                            [ngClass]="{'is-invalid': loginForm.get('password')?.invalid && loginForm.get('password')?.touched}"
                        >
                        <div class="invalid-feedback" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                            Senha é obrigatória
                        </div>
                    </div>

                    <div class="error-message" *ngIf="errorMessage">
                        {{ errorMessage }}
                    </div>

                    <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    `,
    styles: [`
        .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f5f5f5;
        }

        .login-card {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        .form-group {
            margin-bottom: 1rem;
        }

        .form-control {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        .is-invalid {
            border-color: #dc3545;
        }

        .invalid-feedback {
            color: #dc3545;
            font-size: 0.875rem;
        }

        .error-message {
            color: #dc3545;
            text-align: center;
            margin-bottom: 1rem;
        }

        .btn-primary {
            width: 100%;
            padding: 0.75rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .btn-primary:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    `]
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const credentials: LoginRequest = this.loginForm.value;

            this.authService.login(credentials).subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.errorMessage = 'Usuário ou senha inválidos';
                }
            });
        }
    }
} 