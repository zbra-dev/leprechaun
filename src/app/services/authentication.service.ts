import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../repositories/user.repository';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = this._firebaseAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  public async signInWithGoogle() {
    return await this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  public isLoggedIn() {
    return this._firebaseAuth.auth.currentUser != null;
  }

  getUserDetails() {
    return this.userDetails;
  }

  public logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/login']));
  }

  public get authenticatedUser(): Observable<User> {
    return this._firebaseAuth.user.pipe(map(fbUser => new User(fbUser.uid, fbUser.displayName, fbUser.email, fbUser.photoURL)));
  }

  public updateUserProfile(user : User): Promise<void> {
    return this.userDetails.updateProfile({ displayName: user.name, photoURL: user.picture });
  }
}
