import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { RegiaoService } from 'src/app/services/regiao.service';

import { RegiaoComponent } from './regiao.component';
import { RegiaoFormComponent } from './regiao-form/regiao-form.component';
import { RegiaoRoutingModule } from './regiao.routing';
import { SeletorCidadeModule } from 'src/app/components/seletor-cidade/seletor-cidade.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    RegiaoRoutingModule,
    SeletorCidadeModule
  ],
  declarations: [RegiaoComponent,
    RegiaoFormComponent,
  ],
  providers: [RegiaoService],
  exports: [RegiaoComponent]
})
export class RegiaoModule { }
