// src/app/modules/regiao/regiao-form/regiao-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Cidade } from 'src/app/models/cidade.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { RegiaoService } from 'src/app/services/regiao.service';
import { Regiao } from 'src/app/models/regiao.model';

@Component({
  selector: 'app-regiao-form',
  templateUrl: './regiao-form.component.html',
  styleUrls: ['./regiao-form.component.scss']
})
export class RegiaoFormComponent implements OnInit {

  regiaoForm: FormGroup;
  cidades: Cidade[] = [];
  isEdicao: boolean = false;
  regiaoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private regiaoService: RegiaoService,
    private cidadeService: CidadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.regiaoForm = this.fb.group({
      id: [''],
      nome: ['', [Validators.required]],
      ativa: [true],
      cidades: this.fb.array([], [Validators.required, this.cidadesDuplicadasValidator()])
    });
  }

  ngOnInit(): void {
    this.cidadeService.getCidades().subscribe(cidades => {
    this.cidades = cidades;
    });

    this.route.params.pipe(
    switchMap(params => {
        this.regiaoId = Number(params['id']); // Converte para número AQUI
        if (this.regiaoId) {
        this.isEdicao = true;
        return this.regiaoService.getRegiao(this.regiaoId);
        } else {
        this.isEdicao = false;
        return Promise.resolve(null);
        }
    })
    ).subscribe(regiao => {
    if (regiao) {
        this.regiaoForm.patchValue({
        id: regiao.id,
        nome: regiao.nome,
        ativa: regiao.ativa
        });
        console.log('Cidades:', regiao.cidades);
        this.setarCidades(regiao.cidades);
    } else {
        if (this.isEdicao) { // Adicione esta verificação
        console.error(`Região com ID ${this.regiaoId} não encontrada.`);
        this.router.navigate(['/regiao']);
        }
    }
    });
  }

  get cidadesFormArray() {
    return this.regiaoForm.get('cidades') as FormArray;
  }

  adicionarCidade(): void {
    this.cidadesFormArray.push(this.fb.control('', Validators.required));
  }

  removerCidade(index: number): void {
    this.cidadesFormArray.removeAt(index);
  }

  setarCidades(cidades: string[]): void {
    while (this.cidadesFormArray.length !== 0) {
      this.cidadesFormArray.removeAt(0);
    }
  
    cidades.forEach(cidade => {
      this.cidadesFormArray.push(this.fb.control(cidade, Validators.required)); 
    });
    console.log('cidadesFormArray:', this.cidadesFormArray); 
  }

  onSubmit(): void {
    if (this.regiaoForm.valid) {
      const nomeRegiao = this.regiaoForm.get('nome')?.value;
      const cidadesSelecionadas: string[] = this.cidadesFormArray.value;

      const regiao: Regiao = {
        id: this.regiaoId || 0,
        nome: nomeRegiao,
        ativa: this.regiaoForm.get('ativa')?.value,
        cidades: cidadesSelecionadas
      };

      if (this.isEdicao && this.regiaoId) {
        this.regiaoService.atualizarRegiao(this.regiaoId, regiao).subscribe(() => {
          this.router.navigate(['/regiao']);
        });
      } else {
        this.regiaoService.criarRegiao(regiao).subscribe(() => {
          this.router.navigate(['/regiao']);
        });
      }
    } else {
      console.log(this.regiaoForm.errors);
    }
  }

  cancelar(): void {
    this.router.navigate(['/regiao']);
  }

  cidadesDuplicadasValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const cidades = control.value;

      if (!cidades || cidades.length === 0) {
        return null;
      }

      const cidadesUnicas = new Set(cidades);

      if (cidadesUnicas.size !== cidades.length) {
        return { cidadesDuplicadas: true };
      }

      return null;
    };
  }
}