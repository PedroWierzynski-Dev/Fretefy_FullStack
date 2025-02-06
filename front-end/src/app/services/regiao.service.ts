import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Regiao } from '../models/regiao.model';
import { delay } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class RegiaoService {

  private apiUrl = 'https://api.exemplo.com/regioes'; // TODO: Precisa alterar a url para uma funcional
  private localStorageKey = 'regioes'; 

  private regioes: Regiao[] = [];
  private regioesAtualizadasSubject = new Subject<void>(); 
  regioesAtualizadas$ = this.regioesAtualizadasSubject.asObservable(); 

  constructor(private http: HttpClient) {
    const storedRegioes = localStorage.getItem(this.localStorageKey);
    if (storedRegioes) {
      this.regioes = JSON.parse(storedRegioes).map((regiao: any) => {
        return {
          ...regiao,
          id: Number(regiao.id) 
        };
      });
    } else {
      this.regioes = [
        // { id: 1, nome: 'Região A', ativa: true, cidades: ['SP', 'RJ'] },
        // { id: 2, nome: 'Região B', ativa: false, cidades: ['MG', 'ES'] }
      ];
      this.salvarRegioesNoLocalStorage(); // Salva o mock no localStorage
    }
  }

  private salvarRegioesNoLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.regioes));
    this.regioesAtualizadasSubject.next();
  }

  getRegioes(): Observable<Regiao[]> {
    // REMOVA O MOCK QUANDO TIVER A API
    //return this.http.get<Regiao[]>(this.apiUrl);

    return of(this.regioes).pipe(delay(500));
  }

  getRegiao(id: number): Observable<Regiao> {
    const regiao = this.regioes.find(r => r.id === id);
    if (regiao) {
      return of(regiao).pipe(delay(500));
    } else {
      return of(null).pipe(delay(500)); 
    }
  }

  criarRegiao(regiao: Regiao): Observable<Regiao> {
    
    regiao.id = this.generateId(); 
    this.regioes.push(regiao);
    this.salvarRegioesNoLocalStorage(); 
    console.log('Região criada:', regiao); 
    return of(regiao).pipe(delay(500)); 
  }

  atualizarRegiao(id: number, regiao: Regiao): Observable<Regiao> {
    
    const index = this.regioes.findIndex(r => r.id === id);
    if (index !== -1) {
      this.regioes[index] = regiao; 
      this.salvarRegioesNoLocalStorage();
    }
    console.log(`Região ${id} atualizada:`, regiao);
    return of(regiao).pipe(delay(500)); 
  }

  ativarDesativarRegiao(id: number, ativa: boolean): Observable<Regiao> {
   
    const index = this.regioes.findIndex(r => r.id === id);
    if (index !== -1) {
      this.regioes[index].ativa = ativa; 
      this.salvarRegioesNoLocalStorage(); 
    }
    console.log(`Região ${id} ativada/desativada:`, ativa); 
    return of(this.regioes[index]).pipe(delay(500)); 
  }

  private generateId(): number {
    return this.regioes.length > 0 ? Math.max(...this.regioes.map(r => r.id)) + 1 : 1;
  }
}