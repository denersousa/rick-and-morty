import { Injectable, OnInit } from '@angular/core';
import { UserModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{
  private users: UserModel[] = [
    { id: 1, name: 'John Doe', newUserName: 'john', email: 'john@example.com', password: '123456' },
    // Adicione outros usuários aqui
  ];

  constructor() {
    // Inicializa os perfis de usuário no localStorage, se ainda não estiverem definidos
    if (!localStorage.getItem('userProfiles')) {
      localStorage.setItem('userProfiles', JSON.stringify(this.users));
    }
  }

  register(newUser: UserModel): boolean {
    const users = this.getUserProfiles();
    const existingUser = users.find(user => user.email === newUser.email);
    if (existingUser) {
      // Usuário já está cadastrado
      return false;
    } else {
      // Adiciona o novo usuário à lista de perfis de usuários
      users.push(newUser);
      localStorage.setItem('userProfiles', JSON.stringify(users));
      return true;
    }
  }

  getUserProfiles(): UserModel[] {
    const userProfilesString = localStorage.getItem('userProfiles');
    return userProfilesString ? JSON.parse(userProfilesString) : [];
  }
}
