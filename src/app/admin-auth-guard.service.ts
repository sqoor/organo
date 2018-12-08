import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService
    ) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
      .pipe(map((userApp: AppUser) => userApp.isAdmin));
  }

}
