import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {Store} from '@ngrx/store';
import {isLoggedIn} from '../../auth/auth.selectors';
import {Logout} from '../../auth/auth.actions';
import {DestroyFavorites} from '../../movies/movies.actions';
import {Router} from '@angular/router';
import {UIService} from '../../shared/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>,
              private router: Router,
              private uiService: UIService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(isLoggedIn);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.store.dispatch(new Logout());
    this.store.dispatch(new DestroyFavorites());
    this.router.navigateByUrl('/');
    this.uiService.showSnackbar('Successfully logged out!', 'Close', 2000);
  }
}
