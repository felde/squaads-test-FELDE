/*Base imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeamsRoutingModule } from './teams-routing.module';
import { ListComponent } from './views/list/list.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzListModule } from 'ng-zorro-antd/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    NzCarouselModule,
    NzListModule,
    ScrollingModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzPopconfirmModule
  ]
})
export class TeamsModule { }
