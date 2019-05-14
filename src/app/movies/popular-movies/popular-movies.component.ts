import {Component, OnInit} from '@angular/core';
import {Movie} from '../model/movie';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {PopularMoviesRequested, TopRatedMoviesRequested} from '../movies.actions';
import {selectPopularMovies, selectTopRatedMovies, selectPopularMoviesBackdrop} from '../movies.selectors';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IImage} from 'ng-simple-slideshow';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent implements OnInit {

  popularMovies$: Observable<Movie[]>;
  backdrops$: IImage[];
  topRatedMovies$: Observable<Movie[]>;
  isSmallScreen = this.breakPointObserver.isMatched('(max-width: 599px)');
  carouselHeight = '460px';

  constructor(private store: Store<AppState>,
              private router: Router,
              private breakPointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.store.dispatch(new PopularMoviesRequested());
    this.store.dispatch(new TopRatedMoviesRequested());
    this.popularMovies$ = this.store.pipe(select(selectPopularMovies));
    this.topRatedMovies$ = this.store.pipe(select(selectTopRatedMovies));
    this.store.select(selectPopularMoviesBackdrop).pipe(
      map( res => {
        return res.map(image => {
          return {
            ...image,
            url: this.imgUrl(image.url, 'original'),
            clickAction: () => this.router.navigateByUrl('/movies/' + image.id),
          };
        });
      })
    ).subscribe( backdrops => {
      this.backdrops$ = backdrops.slice(0, 5);
    });

    if (this.isSmallScreen) {
      this.carouselHeight = '220px';
    }
  }

  imgUrl(image: string, size: string = 'w400'): string {
    return 'http://image.tmdb.org/t/p/' + size + image;
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }




}
