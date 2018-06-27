import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Address App';
  constructor(private _router: Router) {
    this._router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url === evt.urlAfterRedirects) {return; }
        this._router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }
}
