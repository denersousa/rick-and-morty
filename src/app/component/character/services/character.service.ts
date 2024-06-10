import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterModel, CharacterResponseModel } from '../models/character.model';
import { IdModel } from '../../shared/models/id.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public baseUrl: string = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  // Obtém um personagem pelo seu ID
  getCharacter(id: number): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(`${this.baseUrl}/character/${id}`);
  }

  // Obtém todos os personagens
  getAllCharacters(): Observable<CharacterResponseModel> {
    return this.http.get<CharacterResponseModel>(`${this.baseUrl}/character`);
  }

  // Obtém múltiplos personagens pelos seus IDs
  getMultipleCharacters(ids: IdModel[]): Observable<CharacterModel[]> {
    // Filtra os IDs inválidos
    const idsFiltrados = ids.filter(id => id);
    // Concatena os IDs em uma string separada por vírgulas
    const idsConcatenados = idsFiltrados.map(id => id.id).join(',');
    // Retorna os personagens correspondentes aos IDs fornecidos
    return this.http.get<CharacterModel[]>(`${this.baseUrl}/character/${idsConcatenados}`);
  }

  // Obtém um personagem pela sua URL
  getCharacterUrl(url: string): Observable<CharacterModel>{
    return this.http.get<CharacterModel>(`${url}`);
  }

  // Obtém a próxima página de personagens
  getNextPage(url: string): Observable<CharacterResponseModel>{
    return this.http.get<CharacterResponseModel>(`${url}`);
  }

  // Filtra os personagens pelo nome
  filter(data: string) : Observable<CharacterResponseModel>{
    return this.http.get<CharacterResponseModel>(`${this.baseUrl}/character/?name=${data}`);
  }
}
