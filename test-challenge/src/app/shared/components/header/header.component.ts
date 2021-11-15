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
  public title: string = "";
  public subTitle: string = "";
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
  public goBack(): void {
    this._router.navigate([this.returnPage])
  }
}
