import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vet } from '../models/veterinaire.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VetService {
  private apiUrl = 'http://localhost:3000/vets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vet[]> {
    return this.http.get<Vet[]>(this.apiUrl);
  }

  getById(id: number): Observable<Vet> {
    return this.http.get<Vet>(`${this.apiUrl}/${id}`);
  }

  create(vet: Vet): Observable<Vet> {
    return this.http.post<Vet>(this.apiUrl, vet);
  }

  update(vet: Vet): Observable<Vet> {
    return this.http.put<Vet>(`${this.apiUrl}/${vet.id}`, vet);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
