import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetpokeService {

  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) { }

  getPokemon(limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?limit=${limit}`);
  }

  getPokemonId(newUrl: string): Observable<any> {
    return this.http.get(`${newUrl}`);
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
