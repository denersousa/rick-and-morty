import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterModel, CharacterResponseModel } from '../models/character.model';
import { IdModel } from '../../shared/models/id.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacter(id: number): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(`${this.baseUrl}/character/${id}`)
  }

  getAllCharacters(): Observable<CharacterResponseModel> {
    return this.http.get<CharacterResponseModel>(`${this.baseUrl}/character`);
  }

  getMultipleCharacters(ids: IdModel[]): Observable<CharacterModel[]> {
    const idsFiltrados = ids.filter(id => id);
    const idsConcatenados = idsFiltrados.map(id => id.id).join(',');
    return this.http.get<CharacterModel[]>(`${this.baseUrl}/character/${idsConcatenados}`);
  }

  getCharacterUrl(url: string): Observable<CharacterModel>{
    return this.http.get<CharacterModel>(`${url}`);
  }

  getNextPage(url: string): Observable<CharacterResponseModel>{
    return this.http.get<CharacterResponseModel>(`${url}`)
  }

  filter(data: string) : Observable<CharacterResponseModel>{
    return this.http.get<CharacterResponseModel>(`${this.baseUrl}/character/?name=${data}`)
  }
}
