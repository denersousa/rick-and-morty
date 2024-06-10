import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private searchService: SearchService) { }

  // Método chamado quando ocorre uma pesquisa na barra de pesquisa
  onSearch(event: Event) {
    // Obtém o valor do elemento de entrada de texto da barra de pesquisa
    const inputElement = event.target as HTMLInputElement;
    // Atualiza o valor da pesquisa no serviço com o valor atual da pesquisa
    this.searchService.updateSearchTerm(inputElement.value);
  }
}
