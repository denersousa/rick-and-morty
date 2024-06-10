import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdModel } from '../models/id.model';
import { InfoModel } from '../models/Information.model';
import { LocationResponseModel } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getLocation(id: IdModel): Observable<InfoModel> {
    return this.http.get<InfoModel>(`${this.baseUrl}/location/${id}`)
  }

  getAllLocations(): Observable<LocationResponseModel> {
    return this.http.get<LocationResponseModel>(`${this.baseUrl}/location`);
  }

  getMultipleLocations(ids: IdModel[]): Observable<InfoModel[]> {
    const idsFiltrados = ids.filter(id => id);
    const idsConcatenados = idsFiltrados.map(id => id.id).join(',');

    return this.http.get<InfoModel[]>(`${this.baseUrl}/location/${idsConcatenados}`);
}
}
