// src/app/modules/regiao/regiao.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegiaoService } from '../../services/regiao.service';
import { Regiao } from '../../models/regiao.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-regiao',
  templateUrl: './regiao.component.html',
  styleUrls: ['./regiao.component.scss']
})
export class RegiaoComponent implements OnInit, OnDestroy {

  regioes$: Observable<Regiao[]> | undefined;
  private regioesSubscription: Subscription;

  constructor(private regiaoService: RegiaoService) { }

  ngOnInit(): void {
    this.carregarRegioes();
    this.regioesSubscription = this.regiaoService.regioesAtualizadas$.subscribe(() => {
      this.carregarRegioes();
    });
  }

  ngOnDestroy(): void {
    this.regioesSubscription.unsubscribe();
  }

  carregarRegioes(): void {
    this.regioes$ = this.regiaoService.getRegioes();
  }

  ativarDesativar(regiao: Regiao): void {
    regiao.ativa = !regiao.ativa; 
    this.regiaoService.ativarDesativarRegiao(regiao.id, regiao.ativa).subscribe(
      (regiaoAtualizada) => {
        console.log(`Região ${regiao.nome} atualizada com sucesso!`);
        this.carregarRegioes(); 
      },
      (error) => {
        console.error('Erro ao atualizar região:', error);
        regiao.ativa = !regiao.ativa; 
      }
    );
  }
}