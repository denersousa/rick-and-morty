import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>('');
  public currentSearchTerm = this.searchTerm.asObservable();

  updateSearchTerm(term: string) {
    // Atualiza o valor do BehaviorSubject com o novo valor da pesquisa
    this.searchTerm.next(term);
  }
}
