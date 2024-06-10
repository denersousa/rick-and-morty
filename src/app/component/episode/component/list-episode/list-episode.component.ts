import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EpisodeModel, EpisodeResponseModel } from '../../models/episode.model';
import { EpisodeService } from '../../services/episode.service';
import { InfoModel } from '../../../shared/models/Information.model';
import { SearchService } from '../../../search/search.service';

@Component({
  selector: 'app-list-episode',
  templateUrl: './list-episode.component.html',
  styleUrls: ['./list-episode.component.scss']
})
export class ListEpisodeComponent implements OnInit {
  public filteredEpisodes: EpisodeModel[] = [];
  public allEpisodes: EpisodeModel[] = [];
  public searchTerm: string = '';
  public searchForm!: FormGroup;
  public infoEpisodes: InfoModel = { count: 0, pages: 0, next: '', prev: '' };
  public loadingNextPage: boolean = false;

  constructor(
    private episodeService: EpisodeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: SearchService
  ) {
    // Inicializa o formulário de pesquisa.
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  ngOnInit() {
    this.getAllepisodes();

    // Verifica mudanças na pesquisa .
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(() => {
      this.onSearch();
    });

    // Obtém a pesquisa atual da barra de pesquisa.
    this.searchService.currentSearchTerm.subscribe(term => {
      if (term !== null && term !== undefined) {
        // Define valor de pesquisa no formulário sem emitir um evento de mudança.
        this.searchForm.get('searchTerm')?.setValue(term, { emitEvent: false });
        // Realiza uma pesquisa com base no novo valor de pesquisa.
        this.onSearch();
      }
    });
  }

  // Obtém todos os episódios
  getAllepisodes() {
    this.episodeService.getAllEpisodes().subscribe((res: EpisodeResponseModel) => {
      if (res && res.results) {
        // Atualiza a lista de episódios filtrados.
        this.filteredEpisodes = res.results;
        this.allEpisodes = res.results;
        this.infoEpisodes = res.info;
      }
    });
  }

  // Método chamado quando o usuário rola para baixo na página
  onScrollDown() {
    if (!this.loadingNextPage && this.infoEpisodes.next) {
      // Verifica se não está carregando a próxima página e se existe uma URL para a próxima página.
      this.loadingNextPage = true;
      this.episodeService.getNextPage(this.infoEpisodes.next).subscribe((res: EpisodeResponseModel) => {
        // Adiciona os episódios da próxima página aos episódios filtrados
        this.filteredEpisodes = this.filteredEpisodes.concat(res.results);
        this.infoEpisodes.next = res.info.next;
        this.loadingNextPage = false;
      });
    }
  }

  // Método chamado quando o valor da pesquisa é alterado
  onSearch() {
    if (this.searchForm) {
      // Obtém o termo de pesquisa do formulário e formata para minúsculas removendo espaços extras.
      const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase()?.trim();
      if (searchTerm) {
        // Filtra os episódios com base no valor da pesquisa.
        this.episodeService.filter(searchTerm).subscribe((res: EpisodeResponseModel) => {
          // Atualiza a lista de episódios filtrados.
          this.filteredEpisodes = res.results;
        });
      } else {
        // Se a pesquisa estiver vazia ele retorna a lista original.
        this.filteredEpisodes = this.allEpisodes.slice();
      }
    }
  }

  // Navega para a página de detalhes do episódio
  infoEpisodeGo(dados: EpisodeModel) {
    //Navega e envia os dados do episodio pela rota.
    this.router.navigate(['/detalhe-episode'], { state: dados });
  }
}
