import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="app-container">
      <header>
        <button (click)="logout()" class="logout-button">Logout</button>
      </header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    header {
      padding: 1rem;
      background-color: #f5f5f5;
      display: flex;
      justify-content: flex-end;
    }
    .logout-button {
      padding: 0.5rem 1rem;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .logout-button:hover {
      background-color: #c82333;
    }
  `]
})
export class AppComponent {
  constructor(private router: Router) { }

  logout() {
    // Limpar dados de autenticação (se houver)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }
}
