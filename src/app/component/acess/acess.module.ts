import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { UsuarioComponent } from './component/user/usuario.component';
import { ProfileUserComponent } from './component/profile-user/profile-user.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, UsuarioComponent, ProfileUserComponent],
  providers: [AuthService, AuthGuard, ],

})
export class AcessModule { }
