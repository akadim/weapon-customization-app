import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeaponType } from './weapon-type';
import { environment } from './../../environments/environment';
import { WeaponOptic } from './weapon-optic';
import { WeaponAmmunition } from './weapon-ammunition';

@Injectable({
  providedIn: 'root'
})
export class CustomizeWeaponServiceService {

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getAllWeaponTypes(): Observable<WeaponType[]> {
      return this.http.get<WeaponType[]>(environment.apiUrl + '/weapon-types');
  }

  getAllWeaponOptics(): Observable<WeaponOptic[]> {
      return this.http.get<WeaponOptic[]>(environment.apiUrl + '/weapon-optics');
  }

  getAllWeaponAmmunitions(): Observable<WeaponOptic[]> {
      return this.http.get<WeaponAmmunition[]>(environment.apiUrl + '/weapon-ammunitions');
  }
}
