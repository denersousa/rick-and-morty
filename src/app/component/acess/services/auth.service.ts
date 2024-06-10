import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  public dadosLogado: LoginModel = {username: '', password: ''}
  public dataUser: UserModel = {id: 0, name: '', newUserName: '', email: '', password: ''}


  constructor(private router: Router) {}

  login(data: UserModel): boolean {
    this.dataUser = data;
    if(this.dataUser){
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
      return true;
    }else {
      return false
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getLoggedUser(){
    return this.dataUser;
  }
}
