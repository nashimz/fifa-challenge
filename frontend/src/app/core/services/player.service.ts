import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = 'api/players/';
  }

  getListaPlayers(
    page: number,
    filters?: { name?: string; club?: string; position?: string }
  ): Observable<any> {
    let params: any = { page, filters };

    if (filters?.name) params.name = filters.name;
    if (filters?.club) params.club = filters.club;
    if (filters?.position) params.position = filters.position;

    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}`, {
      params,
    });
  }

  getPlayerById(id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  downloadPlayersCSV(filters: {
    name?: string;
    club?: string;
    position?: string;
  }): Observable<Blob> {
    let params = new HttpParams();

    if (filters.name) params = params.set('name', filters.name);
    if (filters.club) params = params.set('club', filters.club);
    if (filters.position) params = params.set('position', filters.position);

    return this.http.get(`${this.myAppUrl}${this.myApiUrl}csv`, {
      params,
      responseType: 'blob', // Important for handling binary data
    });
  }

  updatePlayer(id: number, playerData: any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, playerData);
  }
  addPlayer(playerData: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, playerData);
  }
}
