import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  //Verificão de autenticação de usuário antes de permitir o acesso à rota.
  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
