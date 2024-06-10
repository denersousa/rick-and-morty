import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { UserModel } from '../../models/usuario';
import { LoginModel } from '../../models/login.model';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public dadosLogin: LoginModel = { username: '', password: '' }
  public users: UserModel[] = [{ id: 0, name: '', newUserName: '', email: '', password: '' }]
  public dataUser: UserModel = { id: 0, name: '', newUserName: '', email: '', password: '' }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UsuarioService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getStorage();
  }

  /*
    - Obtém perfis de usuários do local storage.

    - Se não houver perfis de usuários no local storage, cria e armazena dois perfis padrão (Admin e Usuario).

    Obs: Sempre é necessário que local storage tenha uma array, tanto para logar, quando para adicionar um novo usuário.
   */
  getStorage(): void {
    const users = this.userService.getUserProfiles();
    if (!users) {
      const fakeUser = [
        { id: 1, name: 'Admin', newUserName: 'admin', email: 'admin@example.com', password: '123456' },
        { id: 2, name: 'Usuario', newUserName: 'user', email: 'user@example.com', password: '123456' }
      ];
      localStorage.setItem('userProfiles', JSON.stringify(fakeUser));
    }
  }

  // Verificão de formulário e autenticação o usuário.
  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.dadosLogin = { username, password };

      // Autenticação de credenciais
      const authenticated = this.authService.checkUser(this.dadosLogin);
      if (authenticated) {
        this.authService.login(authenticated);
        this.router.navigate(['/home']);
      } else {
        this.showLoginErrorModal();
      }
    }
  }

  //Exibe um modal de erro de usuário e senha.
  showLoginErrorModal(): void {
    const modalElement = document.getElementById('loginErrorModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Navega para a página de cadastro.
  goRegister(): void {
    this.router.navigate(['/cadastro']);
  }
}
