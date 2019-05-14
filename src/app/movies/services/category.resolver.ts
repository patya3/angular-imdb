import {MovieInCategory} from '../model/movie';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ImdbService} from './imdb.service';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CategoryResolver implements Resolve<MovieInCategory[]> {
  constructor(private imdbService: ImdbService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieInCategory[]>  {
    const categoryID = route.params.id;

    return combineLatest<MovieInCategory[]>(
      this.imdbService.fetchTopInCategory(categoryID, 1),
      this.imdbService.fetchTopInCategory(categoryID, 2),
      this.imdbService.fetchTopInCategory(categoryID, 3)
    ).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur).slice(0, 50)))
    );
  }


}
