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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !this.router.url.includes('login') && !this.router.url.includes('cadastro');

        this.showSearch = !this.router.url.includes('home');

        if (this.showSidebar) {
          this.renderer.removeClass(document.body, 'no-sidebar');
        } else {
          this.renderer.addClass(document.body, 'no-sidebar');
        }
      }
    });
  }
}
