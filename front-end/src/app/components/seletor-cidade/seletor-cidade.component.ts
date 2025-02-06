import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Cidade } from '../../models/cidade.model';
import { CidadeService } from '../../services/cidade.service';

@Component({
  selector: 'app-seletor-cidade',
  templateUrl: './seletor-cidade.component.html',
  styleUrls: ['./seletor-cidade.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeletorCidadeComponent),
      multi: true
    }
  ]
})
export class SeletorCidadeComponent implements OnInit, ControlValueAccessor {

  cidades: Cidade[] = [];
  @Input() placeholder: string = 'Selecione uma cidade';

  private _valorSelecionado: string = '';
  onChange: any = (_: any) => {}; 
  onTouched: any = () => {};

  constructor(private cidadeService: CidadeService) { }

  ngOnInit(): void {
    this.cidadeService.getCidades().subscribe(cidades => {
      this.cidades = cidades;
    });
  }

  get valorSelecionado(): string {
    return this._valorSelecionado;
  }

  set valorSelecionado(val: string) {
    if (this._valorSelecionado !== val) { 
      this._valorSelecionado = val;
      this.onChange(val); 
      this.onTouched();   
    }
  }

  writeValue(value: any): void {
    this._valorSelecionado = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}