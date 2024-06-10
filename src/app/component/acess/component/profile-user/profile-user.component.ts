import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/usuario';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  public user: UserModel = {
    id: 0,
    name: '',
    newUserName: '',
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Obtendo as informações do usuário logado
    this.user = this.authService.getLoggedUser();
  }

  logout(): void {
    // Aqui você pode adicionar a lógica de deslogar o usuário
    console.log('Usuário deslogado');
    // Redirecionar para a página de login (ajuste o caminho conforme necessário)
    this.router.navigate(['/login']);
  }
}
