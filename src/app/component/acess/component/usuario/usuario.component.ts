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
export class UsuarioComponent implements OnInit {
  public userForm: FormGroup;
  public user: UserModel ={ id: 0, name: '', newUserName: '', email: '', password: '' }


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

  ngOnInit(): void {
  }

  register(): void {
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      const success = this.userService.register(this.user);
      if (success) {
        // Registro bem-sucedido
        this.userForm.reset();
        this.irLogin()
      } else {
        // Exibir mensagem de erro ao usuário (usuário já cadastrado, por exemplo)
        console.log('Erro: Usuário já cadastrado!');
      }
    }
  }

  irLogin(){
    this.router.navigate(['/login'])
  }
}
