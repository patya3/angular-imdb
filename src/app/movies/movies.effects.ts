import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ImdbService} from './services/imdb.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {
  AddedToFavorites,
  FavoritesLoaded,
  FavoritesRequested,
  MovieLoaded,
  MovieRequested,
  MoviesActionTypes,
  PopularMoviesLoaded,
  PopularMoviesRequested, TopRatedMoviesLoaded,
  TopRatedMoviesRequested
} from './movies.actions';
import {map, mergeMap, withLatestFrom, filter} from 'rxjs/operators';
import {favoritesLoaded, popularMoviesLoaded, selectFavoriteMovies, topRatedMoviesLoaded} from './movies.selectors';

@Injectable()
export class MoviesEffects {

  @Effect()
  loadPopularMovies$ = this.actions$
    .pipe(
      ofType<PopularMoviesRequested>(MoviesActionTypes.PopularMoviesRequested),
      withLatestFrom(this.store.pipe(select(popularMoviesLoaded))),
      filter(([action, pmLoaded]) => !pmLoaded),
      mergeMap(() => this.imdbService.fetchMostPopularMovies()),
      map(popularMovies => new PopularMoviesLoaded({popularMovies}))
    );

  @Effect()
  loadMovie$ = this.actions$
    .pipe(
      ofType<MovieRequested>(MoviesActionTypes.MovieRequested),
      mergeMap(action => this.imdbService.findMovieById(action.payload.movieId)),
      map(movie => new MovieLoaded({movie}))
    );

  @Effect()
  loadTopRatedMovies$ = this.actions$
    .pipe(
      ofType<TopRatedMoviesRequested>(MoviesActionTypes.TopRatedMoviesRequested),
      withLatestFrom(this.store.pipe(select(topRatedMoviesLoaded))),
      filter(([action, trmLoaded]) => !trmLoaded),
      mergeMap(() => this.imdbService.fetchTopRatedMovies()),
      map(topRatedMovies => new TopRatedMoviesLoaded({topRatedMovies}))
    );

  @Effect()
  loadFavorites$ = this.actions$
    .pipe(
      ofType<FavoritesRequested>(MoviesActionTypes.FavoritesRequested),
      withLatestFrom(this.store.pipe(select(favoritesLoaded))),
      filter(([action, fLoaded]) => !fLoaded),
      mergeMap(() => this.imdbService.fetchFavoriteMovies()),
      map(favoriteMovies => new FavoritesLoaded({favoriteMovies}))
    );

  constructor(private actions$: Actions, private imdbService: ImdbService, private store: Store<AppState>) {}
}
