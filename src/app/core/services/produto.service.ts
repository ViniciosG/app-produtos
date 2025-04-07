import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Produto, ProdutoRequest } from '../models/produto.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private apiUrl = `${environment.apiUrl}produtos`;

    constructor(private http: HttpClient) { }

    listar(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.apiUrl);
    }

    buscarPorId(id: number): Observable<Produto> {
        return this.http.get<Produto>(`${this.apiUrl}/${id}`);
    }

    criar(produto: ProdutoRequest): Observable<Produto> {
        return this.http.post<Produto>(this.apiUrl, produto);
    }

    atualizar(id: number, produto: ProdutoRequest): Observable<Produto> {
        return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
    }

    deletar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    ativar(id: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${id}/ativar`, {});
    }

    inativar(id: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${id}/inativar`, {});
    }
} 