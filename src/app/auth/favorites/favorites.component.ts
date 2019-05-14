import { Component, OnInit } from '@angular/core';
import {ImdbService} from '../../movies/services/imdb.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {DeletedFromFavorites, FavoritesRequested} from '../../movies/movies.actions';
import {noop, Observable} from 'rxjs';
import {Movie} from '../../movies/model/movie';
import {selectFavoriteMovies} from '../../movies/movies.selectors';
import {tap} from 'rxjs/operators';
import {UIService} from '../../shared/ui.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteMovies$: Observable<Movie[]>;

  constructor(private imdbService: ImdbService,
              private store: Store<AppState>,
              private uiService: UIService) { }

  ngOnInit() {
    this.store.dispatch(new FavoritesRequested());
    this.favoriteMovies$ = this.store.pipe(select(selectFavoriteMovies));
  }

  imgUrl(image: string, size: string = 'w300'): string {
    return 'http://image.tmdb.org/t/p/' + size + image;
  }

  deleteFromFavorites(movieID: number, favorite: boolean = false) {
    this.imdbService.markAsFavorite(movieID, favorite)
      .pipe(
        tap(res => {
          this.uiService.showSnackbar('Successfully deleted from favorites!', 'Close', 2000);
        })
      ).subscribe(
      noop, () => this.uiService.showSnackbar('Error occurred!', 'Close', 2000)
    );

    this.store.dispatch(new DeletedFromFavorites({deletedMovieID: movieID}));
  }


}
