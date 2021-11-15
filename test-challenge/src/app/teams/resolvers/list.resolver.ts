import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { League } from 'src/app/shared/interfaces/Leagues.interface';
import { MainService } from 'src/app/shared/services/main.service';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<Observable<League[]>> {
  constructor(private _service: MainService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<League[]> {
    return this._service.getAll<League>("leagues")
  }
}
