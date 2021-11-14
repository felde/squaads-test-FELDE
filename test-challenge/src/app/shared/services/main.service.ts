import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private urlBaseApi: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  /** C **/
  public add<Type>(element: string, data: Type): Observable<any> {
    return this.http.post<any>(`${this.urlBaseApi}${element}`, data);
  }
  /** R **/
  public getAll<Type>(element: string): Observable<Type> {
    return this.http.get<Type>(`${this.urlBaseApi}${element}`);
  }
  public get<Type>(element: string, id: string): Observable<Type> {
    return this.http.get<Type>(`${this.urlBaseApi}${element}/${id}`);
  }
  /** U **/
  public update<Type>(element: string, id: string, data: Type): Observable<Type> {
    return this.http.put<Type>(`${this.urlBaseApi}${element}/${id}`, data);
  }
  /** D **/
  public delete(element: string, id: string): Observable<any> {
    return this.http.delete(`${this.urlBaseApi}${element}/${id}`);
  }
}
