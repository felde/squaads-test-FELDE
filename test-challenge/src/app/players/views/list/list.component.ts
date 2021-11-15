import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/shared/interfaces/Player.interface';
import { Team } from 'src/app/shared/interfaces/Team.interfase';
import { MainService } from 'src/app/shared/services/main.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public sizeBtn: NzButtonSize = "large";
  public players: Player[] = [];
  public backPlayer: Player[] = [];
  public selectedPlayer: Player = {};
  public selectedTeam: any;
  public allTeams: Team[] = [];
  public showCombo: boolean = false;
  public isVisible = false;
  public isConfirmLoading = false;
  public titleModal: string = "";
  public form!: FormGroup;
  private idParam: string = ";"

  constructor(
    private _AR: ActivatedRoute,
    private _main: MainService,
    public formBuilder: FormBuilder,
    private _notify: NzNotificationService
  ) {
    this.form = this.formBuilder.group({
      id: "",
      Avatar: [null, Validators.compose([Validators.required])],
      PlayerName: [null, Validators.compose([Validators.required])],
      teamId: []
    });
    if (this._AR.snapshot.data.players) {
      this.backPlayer = this._AR.snapshot.data.players;
    }
    this._main.getAll<Team>("teams").subscribe(r => {
      this.allTeams = r;
      this.checkParams();
    })
  }
  private checkParams(): void {
    this._AR.params.subscribe(r => {
      this.idParam = r["idT"];
      this.showCombo = this.idParam === "0";
      if (this.showCombo) this.filterPlayer(this.allTeams[0]);
      else {
        this.players = this.backPlayer;
        this.selectedTeam = this.allTeams.filter(r => r.id === this.idParam)[0];
      }
    })
  }
  private realoadPlayers(item: Team): void {
    this._main.getAll<Player>("players")
      .pipe(map(rs => (this.idParam != "0") ? rs.filter(fil => fil.teamId === this.idParam) : rs))
      .subscribe(r => {
        this.backPlayer = r;
        this.filterPlayer(item);
      });
  }

  ngOnInit(): void {

  }
  public filterPlayer(item: Team): void {
    this.selectedTeam = item;
    this.players = this.backPlayer.filter(r => r.teamId === item.id);
  }
  public getTeamName(item: Player): string {
    let x: string = "";
    this.allTeams.filter(r => { if (r.id == item.teamId) x = r.TeamName ? r.TeamName : "" });
    return x;
  }
  public openModal(item?: Player): void {
    this.titleModal = item ? "Edición del jugador: " + item?.PlayerName : "Nuevo Juagdor";
    let team: Player =
    {
      id: item ? item.id : "",
      Avatar: item ? item.Avatar : "",
      PlayerName: item ? item.PlayerName : "",
      teamId: this.selectedTeam.id ? this.selectedTeam.id : ""
    };
    this.form.patchValue(team);
    this.isVisible = true;
  }
  public handleCancel(): void {
    this.isVisible = false;
  }

  public fileSelected(ev: any): void {
    console.log(ev.files);
    this._main.getImageBase64(ev).then(r => {
      if (r != null) {
        this.form.controls.Avatar.patchValue(r);
      }
    });
  }
  public onSubmit(): void {
    this.isConfirmLoading = true;
    if (this.form.valid) {
      let model: Player = this.form.value;
      if (model.id === "")
        this._main.add<Player>("players", model)
          .subscribe(r => {
            this.isVisible = false;
            this.isConfirmLoading = false;
            this._notify.create(
              "success",
              'Jugador agregado exitosamente',
              'Has agregado a un jugador de refuerzo al equipo..ñ_ñ', { nzDuration: 5000 }
            );
            this.realoadPlayers(this.selectedTeam);
          });
      else
        this._main.update<Player>("players", model.id!, model)
          .subscribe(r => {
            this.isVisible = false;
            this.isConfirmLoading = false;
            this._notify.create(
              "success",
              'Jugador actualizado',
              'Tal vez la foto no era la correcta xD!!', { nzDuration: 5000 }
            );
            this.realoadPlayers(this.selectedTeam);
          });
    }
    else {
      console.log(this.form.controls["id"].errors);
      console.log(this.form.controls["Avatar"].errors);
      console.log(this.form.controls["PlayerName"].errors);
      console.log(this.form.controls["TeamID"].errors);
    }
  }
  public confirmDelete(item: Player): void {
    // console.log(item);
    this._main.delete("players", item.id!)
      .subscribe(
        r => this._notify.create("success",
          'Jugador Eliminado!',
          'Tal vez no era lo que se esperaba', { nzDuration: 3000 }
        ),
        err => {
          this._notify.create("danger",
            'UPS! Ocurrio un error',
            'Puedes volver a intentarlo, o consultar en la Matrix que puede ser!!!', { nzDuration: 5000 }
          )
        },
        () => {
          this.isVisible = false;
          this.isConfirmLoading = false;
          this.realoadPlayers(this.selectedTeam);
        }
      )
  }
  public cancelCancel(item: Team): void {
    this._notify.create(
      "warning",
      'Menos mal te pregunte!!!',
      'Eliminación cancelada', { nzDuration: 1500 }
    );
  }
}
