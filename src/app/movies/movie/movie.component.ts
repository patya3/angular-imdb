import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {MovieDetails} from '../model/movie';
import {ImdbService} from '../services/imdb.service';
import {tap} from 'rxjs/operators';
import {UIService} from '../../shared/ui.service';
import {BehaviorSubject, noop, Observable} from 'rxjs';
import {isLoggedIn} from '../../auth/auth.selectors';
import {AddedToFavorites, DeletedFromFavorites} from '../movies.actions';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit {

  movie: MovieDetails;
  averageRate: number;
  progress = 0;
  isLoggedIn$: Observable<boolean>;
  isFavorite: Observable<boolean>;


  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private imdbService: ImdbService,
              private uiService: UIService) { }

  ngOnInit() {
    this.movie = this.route.snapshot.data.movie;
    this.averageRate = this.movie.vote_average * 10;
    this.isLoggedIn$ = this.store.select(isLoggedIn);
    this.isFavorite = this.imdbService.isFavorite(this.movie.id);
  }

  imgUrl(image: string, size: string): string {
    return 'http://image.tmdb.org/t/p/' + size + '/' + image;
  }

  markAsFavorite(favorite: boolean = true) {
    this.imdbService.markAsFavorite(this.movie.id, favorite)
      .pipe(
        tap(res => {
          let message = 'Successfully added to Favorites!';
          if (!favorite) { message = 'Successfully deleted from favorites!'; }
          this.uiService.showSnackbar(message, 'Close', 2000);
        })
      ).subscribe(
        noop, () => this.uiService.showSnackbar('Error occurred!', 'Close', 2000)
      );
    if (favorite) {
      this.store.dispatch(new AddedToFavorites({addedMovie: this.movie}));
      this.isFavorite = new BehaviorSubject<boolean>(true);
    } else {
      this.store.dispatch(new DeletedFromFavorites({deletedMovieID: this.movie.id}));
      this.isFavorite = new BehaviorSubject<boolean>(false);
    }
  }

  detailsComponentData(): any {
    return {
      top_billed_cast: this.movie.top_billed_cast,
      release_date: this.movie.release_date,
      budget: this.movie.budget,
      revenue: this.movie.revenue,
      runtime: this.movie.runtime,
      original_language: this.movie.original_language,
      trailer: this.movie.trailer,
      genres: this.movie.genres
    };
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      if (this.progress < this.averageRate) {
        this.progress = this.progress + 1;
      }
    }, 3);
  }
}
