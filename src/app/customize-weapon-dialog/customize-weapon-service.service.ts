import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeaponType } from './weapon-type';
import { environment } from './../../environments/environment';
import { WeaponOptic } from './weapon-optic';
import { WeaponAmmunition } from './weapon-ammunition';
import { WeaponConfiguration } from './weapon-configuration';
import { WeaponArsenal } from './weapon-arsenal';

@Injectable({
  providedIn: 'root'
})
export class CustomizeWeaponServiceService {

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getWeaponConfiguration(): Observable<WeaponConfiguration> {
      return this.http.get<WeaponConfiguration>(environment.apiUrl + '/weapon-configuration');
  }

  getAllWeaponOptions(): Observable<WeaponArsenal> {
      return this.http.get<WeaponArsenal>(environment.apiUrl + '/weapon-options');
  }

  getWeaponType(id: number): Observable<WeaponType> {
       return this.http.get<WeaponType>(environment.apiUrl + '/weapon-type/'+ id);
  }

  getWeaponOptic(id: number): Observable<WeaponOptic> {
    return this.http.get<WeaponOptic>(environment.apiUrl + '/weapon-optic/'+ id);
  }

  getWeaponAmmunition(id: number): Observable<WeaponAmmunition> {
    return this.http.get<WeaponAmmunition>(environment.apiUrl + '/weapon-ammunition/'+ id);
  }
}
