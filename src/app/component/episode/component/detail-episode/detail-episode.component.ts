import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { forkJoin } from 'rxjs';
import moment from 'moment'; // Importe Moment.js
import { EpisodeModel } from '../../models/episode.model';
import { EpisodeService } from '../../services/episode.service';
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

  public dados : EpisodeModel = {
    id: 0,
    name: '',
    airDate: '',
    episode: '',
    characters: [''],
    url: '',
    created: ''
  }

  constructor(
    private characterService: CharacterService) {}

  ngOnInit() {
    this.dados = window.history.state;
    if (this.dados) {
      this.isLoading = true;
      const urls = this.dados.characters;
      const requests = urls.map(url => this.characterService.getCharacterUrl(url));

      forkJoin(requests).subscribe({
        next: (characters: CharacterModel[]) => {
          this.characters = characters;
          this.isLoading = false;
          console.log(this.characters);
        },
        error: (error: any) => {
          console.error('Erro ao buscar personagens:', error);
          this.isLoading = false;
        }
      });
    }
  }

  formatarData(date: string) {
    const dataFormatada = moment(date);
    const dataFormatadaString = dataFormatada.format('DD/MM/YYYY');
    return dataFormatadaString;
  }
}
