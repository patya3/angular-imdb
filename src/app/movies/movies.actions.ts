import { Action } from '@ngrx/store';
import {Movie, MovieDetails} from './model/movie';

export enum MoviesActionTypes {
  PopularMoviesRequested = '[Home Page] Most Popular Movies Requested',
  PopularMoviesLoaded = '[Tmdb API] Most Popular Movies Loaded',
  MovieRequested = '[View Movie Page] Movie Requested',
  MovieLoaded = '[Tmdb API] Movie Loaded',
  TopRatedMoviesRequested = '[Home Page] Top Rated Movies Requested',
  TopRatedMoviesLoaded = '[Tmdb API] Top Rated Movies Loaded',
  FavoritesRequested = '[Favorites Page] Favorite Movies Requested',
  FavoritesLoaded = '[Tmdb API] Favorites Loaded',
  DestroyFavorites = '[With Logout] Favorites deleted from store',
  AddedToFavorites = '[View Movie Page] Added a film to favorites',
  DeletedFromFavorites = '[Favorites Page] Delete From favorites'
}

export class PopularMoviesRequested implements Action {
  readonly type = MoviesActionTypes.PopularMoviesRequested;
}

export class PopularMoviesLoaded implements Action {
  readonly  type = MoviesActionTypes.PopularMoviesLoaded;

  constructor(public payload: { popularMovies: Movie[] }) {}
}

export class MovieRequested implements Action {
  readonly type = MoviesActionTypes.MovieRequested;

  constructor(public payload: { movieId: number}) {}
}

export class MovieLoaded implements Action {
  readonly type = MoviesActionTypes.MovieLoaded;

  constructor(public payload: { movie: MovieDetails }) {}
}

export class TopRatedMoviesRequested implements Action {
  readonly type = MoviesActionTypes.TopRatedMoviesRequested;
}

export class TopRatedMoviesLoaded implements Action {
  readonly type = MoviesActionTypes.TopRatedMoviesLoaded;

  constructor(public payload: { topRatedMovies: Movie[] }) {}
}

export class FavoritesRequested implements Action {
  readonly type = MoviesActionTypes.FavoritesRequested;
}

export class FavoritesLoaded implements Action {
  readonly type = MoviesActionTypes.FavoritesLoaded;

  constructor(public payload: { favoriteMovies: Movie[] }) {}
}

export class DestroyFavorites implements Action {
  readonly type = MoviesActionTypes.DestroyFavorites;
}

export class AddedToFavorites implements Action {
  readonly type = MoviesActionTypes.AddedToFavorites;

  constructor(public payload: { addedMovie: Movie }) {}
}

export class DeletedFromFavorites implements Action {
  readonly type = MoviesActionTypes.DeletedFromFavorites;

  constructor(public payload: { deletedMovieID: number }) {}
}

export type MoviesActions =
  PopularMoviesRequested |
  PopularMoviesLoaded |
  MovieRequested |
  MovieLoaded |
  TopRatedMoviesRequested |
  TopRatedMoviesLoaded |
  FavoritesRequested |
  FavoritesLoaded |
  DestroyFavorites |
  AddedToFavorites |
  DeletedFromFavorites;
