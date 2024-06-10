import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CharacterModel, CharacterResponseModel } from '../../models/character.model';
import { InfoModel } from '../../../shared/models/Information.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../../../search/search.service';

@Component({
  selector: 'app-list-character',
  templateUrl: './list-character.component.html',
  styleUrls: ['./list-character.component.scss']
})
export class ListCharacterComponent implements OnInit {
  // Informações sobre os personagens (contagem, páginas, URLs das próximas e anteriores)
  public infoCharacter: InfoModel = { count: 0, pages: 0, next: '', prev: '' };

  // Personagens filtrados exibidos na lista
  public filteredCharacter: CharacterModel[] = [];

  // Todos os personagens recuperados da API
  public allCharacter: CharacterModel[] = [];

  // Indicador de carregamento da próxima página
  public loadingNextPage: boolean = false;

  // Termo de pesquisa atual
  public searchTerm: string = '';

  // Formulário de pesquisa reativo
  public searchForm!: FormGroup;

  constructor(
    private characterService: CharacterService,
    private searchService: SearchService,
    private formBuilder: FormBuilder
  ) {
    // Inicializa o formulário de pesquisa
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  ngOnInit() {
    // Recupera todos os personagens ao inicializar o componente
    this.characterService.getAllCharacters().subscribe((res: CharacterResponseModel) => {
      this.infoCharacter = res.info;
      this.filteredCharacter = res.results;
      this.allCharacter = res.results;
    });

    // Atualiza a lista de personagens ao alterar o termo de pesquisa
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(() => {
      this.onSearch();
    });

    // Define o termo de pesquisa a partir do serviço de pesquisa
    this.searchService.currentSearchTerm.subscribe(term => {
      if (term !== null && term !== undefined) {
        this.searchForm.get('searchTerm')?.setValue(term, { emitEvent: false });
        this.onSearch();
      }
    });
  }

  // Carrega a próxima página de personagens ao rolar a lista para baixo
  onScrollDown() {
    // Verifica se não está carregando a próxima página e se há uma próxima página disponível
    if (!this.loadingNextPage && this.infoCharacter.next) {
      // Define loadingNextPage como true para evitar múltiplas solicitações simultâneas
      this.loadingNextPage = true;
      // Chama o serviço characterService para obter a próxima página de personagens
      this.characterService.getNextPage(this.infoCharacter.next).subscribe((res: CharacterResponseModel) => {
        // Adiciona os personagens da próxima página aos personagens filtrados
        this.filteredCharacter = this.filteredCharacter.concat(res.results);
        // Define loadingNextPage como false após receber a resposta
        this.loadingNextPage = false;
        // Atualiza a URL para a próxima página no objeto infoCharacter
        this.infoCharacter.next = res.info.next;
      });
    }
  }

  // Filtra os personagens com base nos dados da pesquisa
  onSearch() {
    if (this.searchForm) {
      // Obtém o valor do formulário e formata para minúsculas removendo espaços
      const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase()?.trim();
      if (searchTerm) {
        // Filtra os personagens com base na pesquisa
        this.characterService.filter(searchTerm).subscribe((res: CharacterResponseModel) => {
          // Atualiza os personagens filtrados
          this.filteredCharacter = res.results;
        });
      } else {
        // Se a pesquisa estiver vazia, exibe os personagens da lista original.
        this.filteredCharacter = this.allCharacter.slice();
      }
    }
  }
}
