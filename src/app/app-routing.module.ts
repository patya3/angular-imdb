import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PopularMoviesComponent} from './movies/popular-movies/popular-movies.component';
import {MovieComponent} from './movies/movie/movie.component';
import {MovieResolver} from './movies/services/movie.resolver';
import {CategoryComponent} from './movies/category/category.component';
import {CategoryResolver} from './movies/services/category.resolver';

const routes: Routes = [
  { path: '', component: PopularMoviesComponent },
  { path: 'movies/:id', component: MovieComponent, resolve: {movie: MovieResolver}},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'category/:id', component: CategoryComponent, resolve: {movies: CategoryResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
