// Importações necessárias do Angular
import { Router } from '@angular/router';
import { UserModel } from '../acess/models/usuario';
import { AuthService } from './../acess/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] // Corrigido de 'styleUrl' para 'styleUrls'
})
export class SidebarComponent implements OnInit {
  public hideButton: boolean = false;
  public panelOpenState: boolean = false;
  public dataUser: UserModel = {id: 0, name: '', newUserName: '', email: '', password: ''};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtém os dados do usuário logado.
    this.dataUser = this.authService.getLoggedUser();
  }

  // Método para abrir o menu lateral
  openNav() {
    // Obtém referências aos elementos HTML.
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");

    if (sidebar && main) {
      // Define a largura do menu lateral pe a margem esquerda do conteúdo principal.
      sidebar.style.width = "250px";
      main.style.marginLeft = "250px";

      this.hideButton = true;
    }
  }

  // Método para fechar o menu lateral
  closeNav() {
    // Obtém referências aos elementos HTML.
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");

    if (sidebar && main) {
      // Define a largura do menu lateral e a margem esquerda do conteúdo principal
      sidebar.style.width = "0";
      main.style.marginLeft = "0";
      this.hideButton = false;
    }
  }

  // Método para fazer logout
  logoutGo() {
    this.authService.logout();
  }

  // Navega para a página de listagem de personagens
  listCharacterGo() {
    this.router.navigate(['/lista-personagem']);
  }

  // Navega para a página de listagem de episódios
  listaEpisodeGo() {
    this.router.navigate(['/lista-episodios']);
  }

  // Navega para a página inicial
  homeGo() {
    this.router.navigate(['/home']);
  }

  // Navega para a página usuário
  profileGo(){
    this.router.navigate(['/usuario']);
  }
}
