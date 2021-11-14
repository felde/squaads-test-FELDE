import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { ListComponent } from './views/list/list.component';
import { AddComponent } from './views/add/add.component';
import { ViewComponent } from './views/view/view.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    NzCarouselModule
  ]
})
export class TeamsModule { }
