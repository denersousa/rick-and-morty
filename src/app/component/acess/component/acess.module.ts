import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './user/usuario.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, UsuarioComponent, ProfileUserComponent],
  providers: [AuthService, AuthGuard, ],

})
export class AcessModule { }
