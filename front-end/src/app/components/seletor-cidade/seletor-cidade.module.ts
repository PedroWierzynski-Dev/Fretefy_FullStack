import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeletorCidadeComponent } from './seletor-cidade.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [SeletorCidadeComponent],
  exports: [SeletorCidadeComponent],
})
export class SeletorCidadeModule { }
