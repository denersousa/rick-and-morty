import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { UserModel } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {
  public userForm: FormGroup;
  public user: UserModel = { id: 0, name: '', newUserName: '', email: '', password: '' }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      newUserName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  //Registra um novo usuário se o formulário for válido.
  register(): void {
    // Verifica se o formulário é válido
    if (this.userForm.valid) {
      // Atribuiçao oss valores do formulário
      this.user = this.userForm.value;
      // Tenta registrar o usuário
      const success = this.userService.register(this.user);
      // Se o registro for bem-sucedido, redefina o formulário e navegue para a página de login
      if (success) {
        this.userForm.reset();
        this.irLogin();
      } else {
        // Se o registro falhar, exibe uma mensagem de erro no console
        console.log('Erro: Usuário já cadastrado!');
      }
    }
  }

  //Navega para a página de login.
  irLogin(): void {
    this.router.navigate(['/login']);
  }
}
