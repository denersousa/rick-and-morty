import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/acess/component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './component/acess/services/auth-guard.service';
import { DetailEpisodeComponent } from './component/episode/component/detail-episode/detail-episode.component';
import { UsuarioComponent } from './component/acess/component/user/usuario.component';
import { ListCharacterComponent } from './component/character/component/list-character/list-character.component';
import { ListEpisodeComponent } from './component/episode/component/list-episode/list-episode.component';
import { ProfileUserComponent } from './component/acess/component/profile-user/profile-user.component';

// Definição das rotas da aplicação com as rotas protegidas pelo AuthGuard
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: UsuarioComponent },
  { path: 'usuario', component: ProfileUserComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'detalhe-episode', component: DetailEpisodeComponent, canActivate: [AuthGuard] },
  { path: 'lista-personagem', component: ListCharacterComponent, canActivate: [AuthGuard] },
  { path: 'lista-episodios', component: ListEpisodeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
