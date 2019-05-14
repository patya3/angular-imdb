import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {ImdbService} from './movies/services/imdb.service';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { PopularMoviesComponent } from './movies/popular-movies/popular-movies.component';
import {popularMoviesReducer} from './movies/popular-movies.reducer';
import {MoviesEffects} from './movies/movies.effects';
import {moviesReducer} from './movies/movies.reducer';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {MovieResolver} from './movies/services/movie.resolver';
import {MovieComponent} from './movies/movie/movie.component';
import {DetailsComponent} from './movies/movie/details/details.component';
import { CastComponent } from './movies/movie/cast/cast.component';
import {UIService} from './shared/ui.service';
import {AuthEffects} from './auth/auth.effects';
import {AuthService} from './auth/services/auth.service';
import {SlideshowModule} from 'ng-simple-slideshow';
import {topRatedMoviesReducer} from './movies/top-movies.reducer';
import {favoritesReducer} from './movies/favorites.reducer';
import { CategoryComponent } from './movies/category/category.component';
import {CategoryResolver} from './movies/services/category.resolver';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    PopularMoviesComponent,
    MovieComponent,
    DetailsComponent,
    CastComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    SlideshowModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreModule.forFeature('popularMovies', popularMoviesReducer),
    StoreModule.forFeature('movies', moviesReducer),
    StoreModule.forFeature('topRatedMovies', topRatedMoviesReducer),
    StoreModule.forFeature('favorites', favoritesReducer),
    EffectsModule.forFeature([MoviesEffects]),
    EffectsModule.forFeature([AuthEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'})
  ],
  providers: [ImdbService, MovieResolver, UIService, AuthService, CategoryResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
