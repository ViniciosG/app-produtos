import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${endpoint}`);
    }

    post<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${endpoint}`, data);
    }

    put<T>(endpoint: string, data: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
    }

    patch<T>(endpoint: string): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}${endpoint}`, {});
    }

    delete(endpoint: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}${endpoint}`);
    }
} 