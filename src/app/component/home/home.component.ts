import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EpisodeModel } from '../episode/models/episode.model';
import { IdModel } from '../shared/models/id.model';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public allEpisode: EpisodeModel[] = [];
  public allEpisodes: EpisodeModel[] = [];

  public filteredEpisodes: EpisodeModel[] = [];
  public searchTerm: string = '';

  public searchForm!: FormGroup; // Usar FormGroup para a barra de busca

  public idLastEpisode: number = 0;
  public idsAllEpisode: IdModel[] = [];

  constructor(
     private formBuilder: FormBuilder, // Injetar FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''] // Inicializar o campo de busca com string vazia
    });

    this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(300), // Aguardar 300ms após a última digitação
      distinctUntilChanged() // Ignorar se o valor não mudar
    ).subscribe(() => {
      this.onSearch();
    });
  }

  onSearch() {
    if (this.searchForm) { // Verifica se searchForm não é nulo
      const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase()?.trim(); // Converta para minúsculas e remova espaços em branco extras
      console.log('searchTerm:', searchTerm);
      if (searchTerm) {
        this.filteredEpisodes = this.allEpisodes.filter(episode =>
          episode.name.toLowerCase().includes(searchTerm)); // Verifica se o nome do episódio contém o searchTerm
      } else {
        this.filteredEpisodes = this.allEpisodes.slice(); // Se searchTerm for vazio, exibir todos os episódios
      }
    }
  }

}
