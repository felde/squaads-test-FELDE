import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './views/add/add.component';
import { ListComponent } from './views/list/list.component';
import { EditResolver } from './resolvers/edit.resolver';
import { ListResolver } from './resolvers/list.resolver';
import { ViewResolver } from './resolvers/view.resolver';
import { ViewComponent } from './views/view/view.component';

const routes: Routes = [
  { path: "*", redirectTo: "list" },
  { path: "list", component: ListComponent, resolve: { teams: ListResolver } },
  { path: "create-edit/:id?", component: AddComponent, resolve: { teams: EditResolver } },
  { path: "view", component: ViewComponent, resolve: { teams: ViewResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
