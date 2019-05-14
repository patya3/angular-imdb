import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {MovieDetails} from '../model/movie';
import {ImdbService} from './imdb.service';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectMovieById} from '../movies.selectors';
import {filter, first, tap} from 'rxjs/operators';
import {MovieRequested} from '../movies.actions';

@Injectable()
export class MovieResolver implements Resolve<MovieDetails> {
  constructor(
    private imdbService: ImdbService,
    private store: Store<AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetails> {
    const movieId = route.params.id;

    return this.store.pipe(
      select(selectMovieById(movieId)),
      tap(movie => {
        if (!movie) {
          this.store.dispatch(new MovieRequested({movieId}));
        }
      }),
      filter(movie => !!movie),
      first()
    );
  }
}
