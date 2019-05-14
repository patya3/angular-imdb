import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Logout} from '../../auth/auth.actions';
import {DestroyFavorites} from '../../movies/movies.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {Router} from '@angular/router';
import {UIService} from '../../shared/ui.service';
import {Observable} from 'rxjs';
import {isLoggedIn} from '../../auth/auth.selectors';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>,
              private router: Router,
              private uiService: UIService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(isLoggedIn);
  }

  onClose(): void {
    this.closeSidenav.emit();
  }

  logout() {
    this.store.dispatch(new Logout());
    this.store.dispatch(new DestroyFavorites());
    this.router.navigateByUrl('/');
    this.uiService.showSnackbar('Successfully logged out!', 'Close', 2000);
  }

}
