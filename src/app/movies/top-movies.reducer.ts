import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Movie} from './model/movie';
import {MoviesActions, MoviesActionTypes} from './movies.actions';

export interface TopRatedMoviesState extends EntityState<Movie> {
  topRatedMoviesLoaded: boolean;
}

export const adapter: EntityAdapter<Movie> = createEntityAdapter<Movie>();

export const initialTopRatedMoviesState: TopRatedMoviesState = adapter.getInitialState({
  topRatedMoviesLoaded: false
});

export function topRatedMoviesReducer(state = initialTopRatedMoviesState,
                                      action: MoviesActions) {
  switch (action.type) {
    case MoviesActionTypes.TopRatedMoviesLoaded:
      return adapter.addAll(action.payload.topRatedMovies, {
        ...state,
        topRatedMoviesLoaded: true
      });
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
