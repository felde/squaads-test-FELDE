import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/shared/interfaces/Leagues.interface';
import { Player } from 'src/app/shared/interfaces/Player.interface';
import { Team } from 'src/app/shared/interfaces/Team.interfase';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public totalLeagues: number = 0;
  public totalTeams: number = 0;
  public totalPlayers: number = 0;
  constructor(private _main: MainService) {
    this._main.getAll<League>("leagues").subscribe(r => this.totalLeagues = r.length)
    this._main.getAll<Team>("teams").subscribe(r => this.totalTeams = r.length)
    this._main.getAll<Player>("players").subscribe(r => this.totalPlayers = r.length)
  }

  ngOnInit() {
  }

}
