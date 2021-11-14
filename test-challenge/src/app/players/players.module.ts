import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './views/list/list.component';
import { AddComponent } from './views/add/add.component';
import { ViewComponent } from './views/view/view.component';
import { PlayersRoutingModule } from './player.routing.module';



@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule
  ]
})
export class PlayersModule { }
