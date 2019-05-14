import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie, MovieDetails, MovieInCategory} from '../model/movie';
import {map} from 'rxjs/operators';
import {apiBaseUrl, apiKey, baseLanguage} from '../../shared/utils';

@Injectable()
export class ImdbService {

  constructor(private http: HttpClient) {}

  fetchMostPopularMovies(): Observable<Movie[]> {
    return this.http.get<any>(apiBaseUrl + '/movie/popular', {
      params: new HttpParams()
        .set('api_key', apiKey)
        .set('language', baseLanguage)
        .set('page', '1')
    }).pipe(
        map(res => {
          return res.results.map(movie => {
            return {
              id: movie.id,
              vote_average: movie.vote_average,
              title: movie.title,
              popularity: movie.popularity,
              backdrop_path: movie.backdrop_path,
              overview: movie.overview,
              poster: movie.poster_path
            };
          });
        })
      );
  }

  // for slider on the main page
  fetchTopRatedMovies(): Observable<Movie[]> {
    return this.http.get<any>(apiBaseUrl + '/movie/top_rated', {
      params: new HttpParams()
        .set('api_key', apiKey)
        .set('language', baseLanguage)
    }).pipe(
      map(res => {
        return res.results
          .filter(movie => movie.original_language.toString() === 'en')
          .map(movie => {
          return {
            id: movie.id,
            vote_average: movie.vote_average,
            title: movie.title,
            popularity: movie.popularity,
            backdrop_path: movie.backdrop_path
          };
        });
      }),
    );
  }

  findMovieById(movieId: number): Observable<MovieDetails> {
    return this.http.get<any>(apiBaseUrl + '/movie/' + movieId, {
      params: new HttpParams()
        .set('api_key', apiKey)
        .set('append_to_response', 'credits,videos')
    }).pipe(
      map(movie => {
        return {
          id: movie.id,
          vote_average: movie.vote_average,
          title: movie.title,
          popularity: movie.popularity,
          overview: movie.overview,
          top_billed_cast: movie.credits.cast.slice(0, 5),
          all_cast: movie.credits.cast.map(castMember => {
            return {
              order: castMember.order,
              photo: castMember.profile_path,
              name: castMember.name,
              character: castMember.character
            };
          }),
          poster_path: movie.poster_path,
          runtime: movie.runtime,
          release_date: movie.release_date,
          vote_count: movie.vote_count,
          imdb_id: movie.imdb_id,
          backdrop_path: movie.backdrop_path,
          crew: movie.credits.crew.slice(0, 5).map( castMemeber => {
            return {
              job: castMemeber.job,
              name: castMemeber.name
            };
          }),
          budget: movie.budget,
          genres: movie.genres,
          revenue: movie.revenue,
          original_language: movie.original_language,
          trailer: movie.videos.results
            .filter(video => video.type.toString() === 'Trailer').slice(0, 1)
            .map(video => {
              return {
                key: video.key,
                name: video.name
              };
            })[0]
        };
      })
    );
  }

  markAsFavorite(movieId: number, favorite: boolean = true) {
    const account = JSON.parse(localStorage.getItem('user'));
    const url = apiBaseUrl + '/account/' + account.id + '/favorite?api_key=' + apiKey + '&session_id=' + account.session_id;
    return this.http.post<any>(url, {media_type: 'movie', media_id: movieId, favorite});
  }

  fetchFavoriteMovies(): Observable<Movie[]> {
    const account = JSON.parse(localStorage.getItem('user'));
    const url = apiBaseUrl + '/account/' + account.id + '/favorite/movies';
    return this.http.get<any>(url, {
      params: new HttpParams()
        .set('api_key', apiKey)
        .set('session_id', account.session_id)
        .set('sort_by', 'created_at.asc')
    }).pipe(
      map(res => {
        return res.results.map(movie => movie);
      })
    );
  }

  fetchTopInCategory(genreId: number, page: number = 1): Observable<MovieInCategory[]> {
    const url = apiBaseUrl + '/discover/movie';
    return this.http.get<any>(url, {
      params: new HttpParams()
        .set('api_key', apiKey)
        .set('with_genres', String(genreId))
        .set('language', baseLanguage)
        .set('sort_by', 'vote_average.desc')
        .set('vote_count.gte', '3000')
        .set('page', String(page))
    }).pipe(
      map(res => {
        return res.results
          .filter(movie => movie.original_language.toString() === 'en')
          .map(movie => {
            return {
              id: movie.id,
              poster_path: movie.poster_path,
              title: movie.title,
              vote_average: movie.vote_average,
              release_date: movie.release_date
            };
          });
      })
    );
  }

  fetchCategoryName(genreID: number): Observable<string> {
    const url = apiBaseUrl + '/genre/movie/list';
    return this.http.get<any>(url, {
      params: new HttpParams()
        .set('api_key', apiKey)
    }).pipe(
      map(res => {
        return res.genres
          .filter(genre => genre.id == genreID)
          .map(genre => {
            return genre.name;
          });
      })
    );
  }

  isFavorite(movieID: number): Observable<boolean> {
    return this.fetchFavoriteMovies().pipe(
      map(movies => {
        return movies
          .map(movie => movie.id)
          .indexOf(movieID) >= 0;
      })
    );
  }
}

