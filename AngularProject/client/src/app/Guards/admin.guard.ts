import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAdmin().pipe(
      map(response => {
        console.log('Admin guard check passed:', response);
        return true;
      }),
      catchError(error => {
        console.log('Admin guard check failed:', error);
        this.router.navigate(['/Login']);
        return of(false);
      })
    );
  }
}
