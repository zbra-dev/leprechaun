import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService, private location: Location) { }

  canActivate() {
    if ( this.authService.isLoggedIn() ) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { redirect: this.location.path() } });
    return false;
  }
}
