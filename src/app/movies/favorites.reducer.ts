import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Movie} from './model/movie';
import {MoviesActions, MoviesActionTypes} from './movies.actions';

export interface FavoriteMoviesState extends EntityState<Movie> {
  favoritesLoaded: boolean;
}

export const adapter: EntityAdapter<Movie> = createEntityAdapter<Movie>();

export const initialFavoriteMoviesState: FavoriteMoviesState = adapter.getInitialState({
  favoritesLoaded: false
});

export function favoritesReducer(state = initialFavoriteMoviesState,
                                 action: MoviesActions): FavoriteMoviesState {
  switch (action.type) {
    case MoviesActionTypes.FavoritesLoaded:
      return adapter.addAll(action.payload.favoriteMovies, {
        ...state,
        favoritesLoaded: true
      });
    case MoviesActionTypes.DestroyFavorites:
      return adapter.removeAll({
        ...state,
        favoritesLoaded: false
      });
    case MoviesActionTypes.AddedToFavorites:
      return adapter.addOne(action.payload.addedMovie as Movie, state);
    case MoviesActionTypes.DeletedFromFavorites:
      return adapter.removeOne(action.payload.deletedMovieID, state);
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
