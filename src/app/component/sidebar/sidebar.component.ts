import { Router } from '@angular/router';
import { LoginModel } from '../acess/models/login.model';
import { UserModel } from '../acess/models/usuario';
import { AuthService } from './../acess/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  public hideButton: boolean = false;
  panelOpenState = false;
  public dataUser: UserModel = {id: 0, name: '', newUserName: '', email: '', password: ''}

  constructor(
    private authService: AuthService,
    private router: Router){}

  ngOnInit(): void {
    this.dataUser = this.authService.getLoggedUser();
  }

  openNav() {
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    if (sidebar && main) {
      sidebar.style.width = "250px";
      main.style.marginLeft = "250px";
      this.hideButton = true;
    }
  }

  closeNav() {
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    if (sidebar && main) {
      sidebar.style.width = "0";
      main.style.marginLeft = "0";
      this.hideButton = false;

    }
  }

  logoutGo(){
    this.authService.logout();
  }

  listCharacterGo(){
    this.router.navigate(['/lista-personagem'])
  }

  listaEPisodeGo(){
    this.router.navigate(['/lista-episodios'])
  }

  homeGo(){
    this.router.navigate(['/home'])
  }
}
