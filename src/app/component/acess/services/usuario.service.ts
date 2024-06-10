import { Injectable } from '@angular/core';
import { UserModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor() { }

  //Registra um novo usuário.
  register(newUser: UserModel): boolean {
    const users = this.getUserProfiles();

    const existingUser = users.find(user => user.email === newUser.email);
    if (!existingUser) {
      users.push(newUser);
      localStorage.setItem('userProfiles', JSON.stringify(users));
      return true
    } else { return false }
  }

  //Obtém os perfis de usuários armazenados no local storage.
  getUserProfiles(): UserModel[] {
    const userProfilesString = localStorage.getItem('userProfiles');
    return userProfilesString ? JSON.parse(userProfilesString) : [];
  }
}
