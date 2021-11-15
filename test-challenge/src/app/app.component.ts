import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Menu } from './shared/interfaces/Menu.interface';
import { MainService } from './shared/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * #### Description
   * Bandera para mostrar de primera vez el menu abierto o cerrado
   * #### Version
   * since: V1.0.0
   * Determines whether collapsed is
   */
  isCollapsed = true;

  /**
   * #### Description
   * Listado de items de menu para mostrar en el front
   * #### Version
   * since: V1.0.0
   * Menus  of app component
   */
  public menus: Menu[] = [];
  constructor(
    private _service: MainService,
    private _notify: NzNotificationService
  ) {
    this._service.getAll<Menu>("menu")
      .subscribe(r => this.menus = r,
        err => {
          console.log(err);
          this._notify.create(
            "error",
            'Ups! U_U',
            'Ocurrio un error al generar el menú, en la consola de la matrix puede estar la razón!!', { nzDuration: 5000 }
          );
        });
  }
}
