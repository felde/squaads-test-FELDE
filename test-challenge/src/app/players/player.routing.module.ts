import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './views/list/list.component';
import { ListPlayerResolver } from './resolvers/list.resolver';
import { ListResolver } from '../teams/resolvers/list.resolver';

const routes: Routes = [
    { path: "*", redirectTo: "list/0" },
    {
        path: "list/:idT",
        component: ListComponent,
        resolve: {
            players: ListPlayerResolver
        },
        data: { title: "Jugadores", subTitle: "Listado", goBack: "/teams/list" }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayersRoutingModule { }
