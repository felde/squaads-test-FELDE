import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';
@Component({
  selector: 'tunita-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * #### Description
   * Etiqueta dinamica para el titulo de sección
   * #### Version
   * since: V1.0.0
   * Title  of header component
   */
  public title: string = "";

  /**
   * #### Description
   * Etiqueta dinamica para mostrar el subsección en la que se entró
   * #### Version
   * since: V1.0.0
   * Sub title of header component
   */
  public subTitle: string = "";

  /**
   * #### Description
   * Url a redireccionar cuando se sale de la seccion donde se encuentre
   * #### Version
   * since: V1.0.0
   * Return page of header component
   */
  public returnPage: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        let snapshot = this._router.routerState.snapshot;
        let title = route.snapshot.data['title'];
        let sub = route.snapshot.data['subTitle'];
        let url = route.snapshot.data['goBack'];
        this.title = title;
        this.subTitle = sub;
        this.returnPage = url;
      });
  }

  ngOnInit(): void {
  }

  /**
   * #### Description
   * Evento que redireccion al usuario a una pagina en especifico
   * #### Version
   * since: V1.0.0
   * Go back
   */
  public goBack(): void {
    this._router.navigate([this.returnPage])
  }
}
