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

  getEpisode(id: number): Observable<EpisodeModel> {
    return this.http.get<EpisodeModel>(`${this.baseUrl}/episode/${id}`);
  }

  getAllEpisodes(): Observable<EpisodeResponseModel> {
    return this.http.get<EpisodeResponseModel>(`${this.baseUrl}/episode`);
  }

  getNextPage(url: string): Observable<EpisodeResponseModel> {
    return this.http.get<EpisodeResponseModel>(`${url}`);
  }

  filter(name: string): Observable<EpisodeResponseModel> {
    return this.http.get<EpisodeResponseModel>(`${this.baseUrl}/episode/?name=${name}`);
  }
}
