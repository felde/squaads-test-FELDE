import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  /**
   * #### Description
   * Url base para ocmunicar con apis, obtenida de las variables de entorno
   * #### Version
   * since: V1.0.0
   * Url base api of main service
   */
  private urlBaseApi: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  /**
   * #### Description
   * Método genérico para crear un objecto dentro de la api
   * #### Version
   * since: V1.0.0 
   * Adds main service
   * @template Type 
   * @param element 
   * @param data 
   * @returns add 
   */
  public add<Type>(element: string, data: Type): Observable<any> {
    return this.http.post<any>(`${this.urlBaseApi}${element}`, data);
  }

  /**
   * #### Description
   * Método genérico para obtener todos los datos en forma de lista de un endpoint
   * #### Version
   * since: V1.0.0
   * Gets all
   * @template Type 
   * @param element 
   * @returns all 
   */
  public getAll<Type>(element: string): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.urlBaseApi}${element}`);
  }

  /**
   * #### Description
   * Método genérico para obtener un objeto en especifico de un listado
   * #### Version
   * since: V1.0.0
   * Gets main service
   * @template Type 
   * @param element 
   * @param id 
   * @returns get 
   */
  public get<Type>(element: string, id: string): Observable<Type> {
    return this.http.get<Type>(`${this.urlBaseApi}${element}/${id}`);
  }

  /**
   * #### Description
   * Mñetodo para actualizar un modelo
   * #### Version
   * since: V1.0.0
   * Updates main service
   * @template Type 
   * @param element 
   * @param id 
   * @param data 
   * @returns update 
   */
  public update<Type>(element: string, id: string, data: Type): Observable<Type> {
    return this.http.put<Type>(`${this.urlBaseApi}${element}/${id}`, data);
  }

  /**
   * #### Description
   * Método para eliminar un modelo
   * #### Version
   * since: V1.0.0
   * Deletes main service
   * @param element 
   * @param id 
   * @returns delete 
   */
  public delete(element: string, id: string): Observable<any> {
    return this.http.delete(`${this.urlBaseApi}${element}/${id}`);
  }

  /**
   * #### Description
   * Método para convertir el file seleccionado de un fileinput y convertirlo a base64
   * #### Version
   * since: V1.0.0
   * Gets image base64
   * @param input 
   * @returns image base64 
   */
  public getImageBase64(input: any): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (input.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = () => {
          let base64: string = reader.result ? reader.result.toString() : ""
          resolve(base64);
        }
      }
      else reject();
    });
  }
}
