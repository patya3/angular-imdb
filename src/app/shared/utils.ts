import { Params, RouterStateSnapshot } from '@angular/router';
import {
  RouterReducerState,
  RouterStateSerializer,
} from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}

// const variables
export const apiBaseUrl = 'https://api.themoviedb.org/3';
export const apiKey = '5a94cb264f564e331c718f66d4f8f6cd';
export const baseLanguage = 'en-US';
