import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EpisodeModel, EpisodeResponseModel } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private baseUrl: string = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  // Obtém os detalhes de um episódio pelo ID.
  getEpisode(id: number): Observable<EpisodeModel> {
    return this.http.get<EpisodeModel>(`${this.baseUrl}/episode/${id}`);
  }

  // Obtém todos os episódios.
  getAllEpisodes(): Observable<EpisodeResponseModel> {
    return this.http.get<EpisodeResponseModel>(`${this.baseUrl}/episode`);
  }

  // Obtém a próxima página de episódios.
  getNextPage(url: string): Observable<EpisodeResponseModel> {
    return this.http.get<EpisodeResponseModel>(`${url}`);
  }

  // Filtra os episódios pelo nome.
  filter(name: string): Observable<EpisodeResponseModel> {
    return this.http.get<EpisodeResponseModel>(`${this.baseUrl}/episode/?name=${name}`);
  }
}
