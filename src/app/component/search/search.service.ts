import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // BehaviorSubject para armazenar o termo de pesquisa atual
  private searchTerm = new BehaviorSubject<string>('');

  // Observable público para permitir que outros componentes se inscrevam e recebam atualizações do termo de pesquisa
  public currentSearchTerm = this.searchTerm.asObservable();

  // Método para atualizar o valor da pesquisa
  updateSearchTerm(term: string) {
    // Atualiza o valor do BehaviorSubject com o novo valor da pesquisa
    this.searchTerm.next(term);
  }
}
