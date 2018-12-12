import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';

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
