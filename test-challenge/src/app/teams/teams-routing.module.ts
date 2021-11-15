import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './views/list/list.component';
import { ListResolver } from './resolvers/list.resolver';

const routes: Routes = [
  {
    path: "*",
    redirectTo: "list"
  },
  {
    path: "list", component: ListComponent,
    resolve: { teams: ListResolver },
    data: { title: "Equipos", subTitle: "Equipos por ligas", goBack: "/welcome" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
