import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/shared/interfaces/Player.interface';
import { MainService } from 'src/app/shared/services/main.service';

@Injectable({
  providedIn: 'root'
})
export class ListPlayerResolver implements Resolve<Observable<Player[]>> {
  constructor(private _main: MainService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Player[]> {
    let id = route.paramMap.get("idT")?.toString();
    return this._main.getAll<Player>("players").pipe(map(rs => (id != "0") ? rs.filter(fil => fil.teamId === id) : rs));
  }
}
