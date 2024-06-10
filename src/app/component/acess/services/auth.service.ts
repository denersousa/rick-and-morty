import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  public dadosLogado: LoginModel = { username: '', password: '' };
  public dataUser: UserModel = { id: 0, name: '', newUserName: '', email: '', password: '' };

  public users: UserModel[] = [{ id: 0, name: '', newUserName: '', email: '', password: '' }];
  public dadosLogin: LoginModel = { username: '', password: '' };




  constructor(private router: Router, private userService: UsuarioService) { }

  login(value: boolean): boolean {
    this.isAuthenticated = value;

    if (this.isAuthenticated) {
      this.router.navigate(['/home']);
    }
    return this.isAuthenticated;
  }

  /*
   Verificação se o usuário fornecido no formulário de login existe nos perfis de usuários e autentica o usuário.
  */
  checkUser(value: LoginModel) {
    this.users = this.userService.getUserProfiles();
    if (value) {
      this.dadosLogin = {
        username: value.username,
        password: value.password
      }
    }
    const userIn = this.users.find(user => user.newUserName === this.dadosLogin.username);
    if (userIn) {
      this.dataUser = {
        id: userIn.id,
        name: userIn.name,
        newUserName: userIn.newUserName,
        email: userIn.email,
        password: userIn.password
      };
    }
    return this.dataUser.password === this.dadosLogin.password
  }


  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getLoggedUser() {
    return this.dataUser;
  }
}
