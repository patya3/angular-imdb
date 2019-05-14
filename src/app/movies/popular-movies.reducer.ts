import {Movie} from './model/movie';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {MoviesActions, MoviesActionTypes} from './movies.actions';

export interface PopularMoviesState extends  EntityState<Movie> {
  popularMoviesLoaded: boolean;
}

export const adapter: EntityAdapter<Movie> = createEntityAdapter<Movie>();

export const initialPopularMoviesState: PopularMoviesState = adapter.getInitialState({
  popularMoviesLoaded: false
});

export function popularMoviesReducer(state = initialPopularMoviesState, action: MoviesActions): PopularMoviesState {
  switch (action.type) {
    case MoviesActionTypes.PopularMoviesLoaded:
      return adapter.addAll(action.payload.popularMovies, {
        ...state,
        popularMoviesLoaded: true
      }) as PopularMoviesState;
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
