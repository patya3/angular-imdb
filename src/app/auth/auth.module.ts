import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.service';
import {StoreModule} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {AuthEffects} from './auth.effects';
import {MaterialModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FavoritesComponent } from './favorites/favorites.component';
import {AuthGuard} from './auth.guard';

@NgModule({
  declarations: [LoginComponent, FavoritesComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StoreModule.forFeature('auth', fromAuth.authReducer)
  ],
  providers: [AuthEffects, AuthGuard]
})
export class AuthModule { }
