import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, Login, LoginAsGuest, Logout} from './auth.actions';
import {tap} from 'rxjs/operators';
import {defer, of} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
     localStorage.setItem('user', JSON.stringify(action.payload.user));
    })
  );

  @Effect({dispatch: false})
  loginAsGuest$ = this.actions$.pipe(
    ofType<LoginAsGuest>(AuthActionTypes.LoginAsGuestAction),
    tap(action => localStorage.setItem('guest', JSON.stringify(action.payload)))
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      if (localStorage.getItem('user') != null) {
        localStorage.removeItem('user');
      }
      if (localStorage.getItem('guest') != null) {
        localStorage.removeItem('guest');
      }
    })
  );

  @Effect()
  init$ = defer(() => {

    const userData = localStorage.getItem('user');
    if (userData) {
      return of(new Login({user: JSON.parse(userData)}));
    } else {
      return of(new Logout()) as any;
    }

  });


  constructor(private actions$: Actions, private authService: AuthService) {
  }

}
