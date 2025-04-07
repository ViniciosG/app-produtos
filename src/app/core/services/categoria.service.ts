import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, CategoriaRequest } from '../models/categoria.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private apiUrl = 'http://localhost:8080/api/categorias';

    constructor(private http: HttpClient) { }

    listar(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.apiUrl);
    }

    buscarPorId(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
    }

    criar(categoria: CategoriaRequest): Observable<Categoria> {
        return this.http.post<Categoria>(this.apiUrl, categoria);
    }

    atualizar(id: number, categoria: CategoriaRequest): Observable<Categoria> {
        return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
    }

    deletar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    ativar(id: number): Observable<Categoria> {
        return this.http.patch<Categoria>(`${this.apiUrl}/${id}/ativar`, {});
    }

    inativar(id: number): Observable<Categoria> {
        return this.http.patch<Categoria>(`${this.apiUrl}/${id}/inativar`, {});
    }
} 