import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
      this.user$ = afAuth.authState;

      firebase.auth().getRedirectResult()
        .then(result => {
           if (result.user) {
            this.userService.save(result.user);

            const returnUrl = localStorage.getItem('returnUrl');
            this.router.navigateByUrl(returnUrl);
           }
        });
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.router.navigateByUrl('/'));
  }

  get appUser$() {
    return this.user$
    .pipe(switchMap(user => {
      if (user) {
        return this.userService.get(user.uid);
       }

      return of(null);
    }));
  }
}
