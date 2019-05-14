import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {apiBaseUrl, apiKey} from '../../shared/utils';
import {Observable, pipe} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string): Observable<any> {

    const urlLogin = apiBaseUrl + '/authentication/token/validate_with_login?api_key=' + apiKey;
    const urlRequestToken = apiBaseUrl + '/authentication/token/new';
    const urlCreateSession = apiBaseUrl + '/authentication/session/new?api_key=' + apiKey;
    const urlGetAccount = apiBaseUrl + '/account';

    return this.http.get<any>(urlRequestToken, {
      params: new HttpParams()
        .set('api_key', apiKey)
    }).pipe(
      mergeMap(res => this.http.post<any>(urlLogin, {username, password, request_token: res.request_token})),
      mergeMap(response => this.http.post<any>(urlCreateSession, {request_token: response.request_token})),
      mergeMap(sessionRes => this.http.get<any>(urlGetAccount, {
        params: new HttpParams()
          .set('api_key', apiKey)
          .set('session_id', sessionRes.session_id)
      }).pipe(
        map(accountDetails => {
          return {
            ...accountDetails,
            session_id: sessionRes.session_id
          };
        })
      )
    ));
  }

  loginAsGuest(): Observable<any> {
    const url = apiBaseUrl + '/authentication/guest_session/new';
    return this.http.get(url, {
      params: new HttpParams()
        .set('api_key', apiKey)
    }).pipe(
      map(res => res)
    );
  }
}
