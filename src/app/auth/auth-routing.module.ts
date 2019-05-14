import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
