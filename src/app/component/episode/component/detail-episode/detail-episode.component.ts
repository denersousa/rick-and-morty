import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import moment from 'moment';
import { EpisodeModel } from '../../models/episode.model';
import { CharacterModel } from '../../../character/models/character.model';
import { CharacterService } from '../../../character/services/character.service';


@Component({
  selector: 'app-detail-episode',
  templateUrl: './detail-episode.component.html',
  styleUrls: ['./detail-episode.component.scss']
})
export class DetailEpisodeComponent implements OnInit {
  public characters: CharacterModel[] = [];
  public isLoading: boolean = false;
  public dados: EpisodeModel = {
    id: 0,
    name: '',
    airDate: '',
    episode: '',
    characters: [''],
    url: '',
    created: ''
  }

  constructor(
    private characterService: CharacterService) { }

  ngOnInit() {
    // Obtém os dados do episódio passados pelo histórico de navegação
    this.dados = window.history.state;
    if (this.dados) {
      this.isLoading = true;
      const urls = this.dados.characters;

      // Cria um array para buscar os detalhes de cada personagem
      const requests = urls.map(url => this.characterService.getCharacterUrl(url));

      forkJoin(requests).subscribe({
        next: (characters: CharacterModel[]) => {
          this.characters = characters;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Erro ao buscar personagens:', error);
          this.isLoading = false;
        }
      });
    }
  }

  // Formata a data do episódio no formato "DD/MM/YYYY"
  formatarData(date: string) {
    const dataFormatada = moment(date);
    const dataFormatadaString = dataFormatada.format('DD/MM/YYYY');
    return dataFormatadaString;
  }
}
