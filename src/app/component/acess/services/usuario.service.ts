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

    //Verifica se o novo usuário já existe na lista de perfis de usuários.
    const existingUser = users.find(user => user.email === newUser.email);
    //Adiciona o novo usuário à lista de perfis de usuários
    if (!existingUser) {
      users.push(newUser);
      localStorage.setItem('userProfiles', JSON.stringify(users));
      return true
    } else { return false }
  }

  //Obtém os perfis de usuários armazenados no local storage.
  getUserProfiles(): UserModel[] {
    const userProfilesString = localStorage.getItem('userProfiles');
    //Retorna um array de objetos UserModel representando os perfis de usuários.
    return userProfilesString ? JSON.parse(userProfilesString) : [];
  }
}
