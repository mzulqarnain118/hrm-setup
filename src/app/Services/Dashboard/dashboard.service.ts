import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { roles } from 'src/app/_Interfaces/dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getWeatherForcast():Observable<any>{
    const URL = `${environment.AuthServiceURL}/weather/historical`;
    const params = new HttpParams().set('lat', 23).set('lon', 43).set('interval','1M');
    return this.http.get(URL, { params });
  }

  getRoles(): Observable<roles[]> {
    const URL = `${environment.AuthServiceURL}/auth/getRoles`;
    return this.http.get<roles[]>(URL, {withCredentials: true });
  }

  getEsurveyStats(): Observable<any> {
    const URL = `${environment.AuthServiceURL}/landing/getEsurveyStats`;
    return this.http.get<any>(URL, {withCredentials: true });
  }
}
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { roles } from 'src/app/_Interfaces/dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getWeatherForcast():Observable<any>{
    const URL = `${environment.AuthServiceURL}/weather/historical`;
    const params = new HttpParams().set('lat', 23).set('lon', 43).set('interval','1M');
    return this.http.get(URL, { params });
  }

  getRoles(): Observable<roles[]> {
    const URL = `${environment.AuthServiceURL}/auth/getRoles`;
    return this.http.get<roles[]>(URL, {withCredentials: true });
  }

  getEsurveyStats(): Observable<any> {
    const URL = `${environment.AuthServiceURL}/landing/getEsurveyStats`;
    return this.http.get<any>(URL, {withCredentials: true });
  }
}
