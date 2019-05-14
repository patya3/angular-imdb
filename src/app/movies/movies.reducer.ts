import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {MovieDetails} from './model/movie';
import {MoviesActions, MoviesActionTypes} from './movies.actions';

export interface MovieState extends EntityState<MovieDetails> {

}

export const adapter: EntityAdapter<MovieDetails> = createEntityAdapter<MovieDetails>();

export const initialMoviesState: MovieState = adapter.getInitialState();

export function moviesReducer(state = initialMoviesState,
                              action: MoviesActions): MovieState {
  switch (action.type) {
    case MoviesActionTypes.MovieLoaded:
      return adapter.addOne(action.payload.movie, state);
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors()
