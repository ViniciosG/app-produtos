import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, CategoriaRequest } from '../../../core/models/categoria.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private readonly endpoint = '/api/categorias';

    constructor(private apiService: ApiService) { }

    listar(): Observable<Categoria[]> {
        return this.apiService.get<Categoria[]>(this.endpoint);
    }

    buscar(id: number): Observable<Categoria> {
        return this.apiService.get<Categoria>(`${this.endpoint}/${id}`);
    }

    criar(categoria: CategoriaRequest): Observable<Categoria> {
        return this.apiService.post<Categoria>(this.endpoint, categoria);
    }

    atualizar(id: number, categoria: CategoriaRequest): Observable<Categoria> {
        return this.apiService.put<Categoria>(`${this.endpoint}/${id}`, categoria);
    }

    inativar(id: number): Observable<Categoria> {
        return this.apiService.patch<Categoria>(`${this.endpoint}/${id}/inativar`);
    }

    ativar(id: number): Observable<Categoria> {
        return this.apiService.patch<Categoria>(`${this.endpoint}/${id}/ativar`);
    }

    deletar(id: number): Observable<void> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
} 