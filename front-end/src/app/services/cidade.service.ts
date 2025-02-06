import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cidade } from '../models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private apiUrl = 'api/cidades'; 
  constructor(private http: HttpClient) { }

  getCidades(): Observable<Cidade[]> {
    //return this.http.get<Cidade[]>(this.apiUrl);

      // Mock de dados para teste
      const mockCidades: Cidade[] = [
          { uf: 'SP', nome: 'São Paulo' },
          { uf: 'RJ', nome: 'Rio de Janeiro' },
          { uf: 'MG', nome: 'Belo Horizonte' },
          { uf: 'ES', nome: 'Vitória' },
          { uf: 'PR', nome: 'Curitiba' },
          { uf: 'PR', nome: 'Colombo' },
          { uf: 'SP', nome: 'Presidente Prudente' },
          { uf: 'SC', nome: 'Florianópolis' },
          { uf: 'RS', nome: 'Porto Alegre' },
      ];
      return of(mockCidades);
  }
}