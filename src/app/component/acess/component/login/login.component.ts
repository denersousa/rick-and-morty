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
  public dadosLogin: LoginModel = {username: '', password: ''}
  public users: UserModel[] = [{ id: 0, name: '', newUserName: '', email: '', password: '' }]
  public dataUser: UserModel = {id: 0, name: '', newUserName: '', email: '', password: ''}

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
    const users = this.userService.getUserProfiles();
    if(!users){
      const fakeUser = [
        { id: 1, name: 'Admin', newUserName: 'admin', email: 'admin@example.com', password: '123456' },
        { id: 2, name: 'Usuario', newUserName: 'user', email: 'user@example.com', password:'123456' }
      ]
      localStorage.setItem('userProfiles', JSON.stringify(fakeUser));
    }
  }

  onSubmit() {
  const checked = this.verificaUser();
    if(checked){
        const success = this.authService.login(this.dataUser);
        if (success) {
          this.router.navigate(['/home']);
        } else {
          // Manipula a falha de login, se necessário
        }
    } else {
      this.showLoginErrorModal(); //Usuario ou senha invalido
    }
  }

  verificaUser(){
    this.users = this.userService.getUserProfiles();
    if (this.loginForm.valid) {
      this.dadosLogin = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value}
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
    return  this.dataUser.password === this.dadosLogin.password
  }

  goRegister(){
    this.router.navigate(['/cadastro'])
  }

  showLoginErrorModal() {
    const modalElement = document.getElementById('loginErrorModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}
