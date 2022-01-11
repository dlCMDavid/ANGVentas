import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //Url por defecto
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  //Url de los componentes añadidos
  {path: 'home', component: HomeComponent},
  {path: 'cliente', component: ClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
