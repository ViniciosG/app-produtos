import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto, ProdutoRequest } from '../../../core/models/produto.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private readonly endpoint = '/api/produtos';

    constructor(private apiService: ApiService) { }

    listar(): Observable<Produto[]> {
        return this.apiService.get<Produto[]>(this.endpoint);
    }

    buscar(id: number): Observable<Produto> {
        return this.apiService.get<Produto>(`${this.endpoint}/${id}`);
    }

    criar(produto: ProdutoRequest): Observable<Produto> {
        return this.apiService.post<Produto>(this.endpoint, produto);
    }

    atualizar(id: number, produto: ProdutoRequest): Observable<Produto> {
        return this.apiService.put<Produto>(`${this.endpoint}/${id}`, produto);
    }

    deletar(id: number): Observable<void> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
} 