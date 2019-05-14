import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {Login, LoginAsGuest} from '../auth.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {UIService} from '../../shared/ui.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private uiService: UIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  login() {

    const values = this.loginForm.value;
    this.authService.login(values.username, values.password)
      .pipe(
        tap(user => {
          this.store.dispatch(new Login({user}));
          this.router.navigateByUrl('/');
        })
      ).subscribe(noop, () => {
        this.uiService.showSnackbar('Bad Credentials!', 'Cancel', 2000);
      });
  }

  loginAsGuest() {
    this.authService.loginAsGuest()
      .pipe(
        tap(guest => {
          this.store.dispatch(new LoginAsGuest(guest));
          this.router.navigateByUrl('/');
        })
      ).subscribe(noop);
  }

}
