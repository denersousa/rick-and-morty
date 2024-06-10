import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rick-morty';

  showSidebar: boolean = true;
  showSearch: boolean = true;


  constructor(private router: Router, private renderer: Renderer2) {
    // Inscreve-se nos eventos de navegação do roteador
    this.router.events.subscribe(event => {
      // Verifica se o evento é uma navegação concluída
      if (event instanceof NavigationEnd) {
        // Verifica a URL atual para determinar se o sidebar e a barra de pesquisa devem ser exibidos
        this.showSidebar = !this.router.url.includes('login') && !this.router.url.includes('cadastro');
        this.showSearch = !this.router.url.includes('home');

        // Adiciona ou remove a classe 'no-sidebar' no body com base na exibição do sidebar
        if (this.showSidebar) {
          this.renderer.removeClass(document.body, 'no-sidebar');
        } else {
          this.renderer.addClass(document.body, 'no-sidebar');
        }
      }
    });
  }
}
