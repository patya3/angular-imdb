import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PopularMoviesState} from './popular-movies.reducer';
import * as fromPopularMovies from './popular-movies.reducer';
import * as fromTopRatedMovies from './top-movies.reducer';
import * as fromFavorites from './favorites.reducer';
import {MovieState} from './movies.reducer';
import {TopRatedMoviesState} from './top-movies.reducer';
import {FavoriteMoviesState} from './favorites.reducer';

export const selectPopularMoviesState = createFeatureSelector<PopularMoviesState>('popularMovies');
export const selectMoviesState = createFeatureSelector<MovieState>('movies');
export const selectTopRatedMoviesState = createFeatureSelector<TopRatedMoviesState>('topRatedMovies');
export const selectFavoriteMoviesState = createFeatureSelector<FavoriteMoviesState>('favorites');

// for popular movies
export const selectPopularMovies = createSelector(
  selectPopularMoviesState,
  fromPopularMovies.selectAll
);


export const popularMoviesLoaded = createSelector(
  selectPopularMoviesState,
  popularMoviesState => popularMoviesState.popularMoviesLoaded
);

export const selectPopularMoviesBackdrop = createSelector(
  selectPopularMovies,
  movies => {
    return movies.map(movie => {
      return {
        url: movie.backdrop_path,
        caption: '<h2>' + movie.title + '</h2>',
        id: movie.id,
        clickAction: null
      };
    });
  }
);


// for movie
export const selectMovieById = (movieId: number) => createSelector(
  selectMoviesState,
  moviesState => moviesState.entities[movieId]
);


// for top rated movies
export const selectTopRatedMovies = createSelector(
  selectTopRatedMoviesState,
  fromTopRatedMovies.selectAll
);

export const topRatedMoviesLoaded = createSelector(
  selectTopRatedMoviesState,
  topRatedMoviesState => topRatedMoviesState.topRatedMoviesLoaded
);


// for favorites
export const selectFavoriteMovies = createSelector(
  selectFavoriteMoviesState,
  fromFavorites.selectAll
);

export const favoritesLoaded = createSelector(
  selectFavoriteMoviesState,
  favoriteMoviesState => favoriteMoviesState.favoritesLoaded
);
