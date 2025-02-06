import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegiaoComponent } from './regiao.component';
import { RegiaoFormComponent } from './regiao-form/regiao-form.component';

const routes: Routes = [
  // { path: '', redirectTo: 'regiao', pathMatch: 'full' }, // REMOVA ESTA LINHA
  { path: '', component: RegiaoComponent }, // Rota para o RegiaoComponent
  { path: 'cadastro', component: RegiaoFormComponent },
  { path: 'editar/:id', component: RegiaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegiaoRoutingModule { }