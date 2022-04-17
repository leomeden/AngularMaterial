import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getMatIconNameNotFoundError } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>('./assets/data/menu.json')
  }


}

