import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    NzStatisticModule,
    NzGridModule,
    NzPipesModule
  ],
  declarations: [
    WelcomeComponent
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
