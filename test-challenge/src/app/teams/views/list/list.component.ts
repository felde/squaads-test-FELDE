import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzCarouselFlipStrategy, NZ_CAROUSEL_CUSTOM_STRATEGIES } from 'ng-zorro-antd/carousel';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { map } from 'rxjs/operators';
import { League } from 'src/app/shared/interfaces/Leagues.interface';
import { Team } from 'src/app/shared/interfaces/Team.interfase';
import { MainService } from 'src/app/shared/services/main.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    {
      provide: NZ_CAROUSEL_CUSTOM_STRATEGIES,
      useValue: [{ name: 'flip', strategy: NzCarouselFlipStrategy }]
    }
  ]
})
export class ListComponent implements OnInit {
  public sizeBtn: NzButtonSize = "large";
  public leagues: League[] = [];
  public selectedLeague: League = {};
  public selectedTab: number = 0;
  public teams: Team[] = [];
  public isLoadingTeams: boolean = false;
  public isVisible = false;
  public isConfirmLoading = false;
  public titleModal: string = "";
  public form!: FormGroup;

  constructor(
    private _AR: ActivatedRoute,
    private _main: MainService,
    public formBuilder: FormBuilder,
    private _notify: NzNotificationService
  ) {
    this.form = this.formBuilder.group(
      {
        id: "",
        TeamLogo: [null, Validators.compose([Validators.required])],
        TeamName: [null, Validators.compose([Validators.required])],
        LeagueID: []
      });
    if (this._AR.snapshot.data.teams) {
      this.leagues = this._AR.snapshot.data.teams;
      this.loadTeams(0);
    }
  }

  ngOnInit(): void {
  }
  public loadTeams(event: number): void {
    this.isLoadingTeams = true;
    this.selectedLeague = this.leagues[event];
    this.selectedTab = event;
    this._main.getAll<Team>("teams")
      .pipe(
        map(el => el.filter(x => x.LeagueID === this.leagues[event].id))
      )
      .subscribe(
        r => {
          if (r.length > 0) this.teams = r
          else this.teams = [];
        },
        err => {
          console.log(err);
          this.teams = [];
        }, () => {
          this.isLoadingTeams = false;
        }
      )
  }
  public openModal(item?: Team): void {
    console.log(item);
    this.titleModal = item ? "Edición de equipo: " + item?.TeamName : "Nuevo equipo";
    // if (item) {
    let team: Team =
    {
      id: item ? item.id : "",
      TeamLogo: item ? item.TeamLogo : "",
      TeamName: item ? item.TeamName : "",
      LeagueID: this.selectedLeague.id ? this.selectedLeague.id : ""
    };
    this.form.patchValue(team);
    // }
    this.isVisible = true;
  }
  public handleCancel(): void {
    this.isVisible = false;
  }
  public handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }
  public fileSelected(ev: any): void {
    console.log(ev.files);
    this._main.getImageBase64(ev).then(r => {
      if (r != null) {
        this.form.controls.TeamLogo.patchValue(r);
      }
    });
  }
  public onSubmit(): void {
    this.isConfirmLoading = true;
    if (this.form.valid) {
      let model: Team = this.form.value;
      if (model.id === "")
        this._main.add<Team>("teams", model)
          .subscribe(r => {
            this.isVisible = false;
            this.isConfirmLoading = false;
            this._notify.create(
              "success",
              'Equipo agregado exitosamente',
              'Logramos agregar correctamente el equipo, vamos a recargar la lista;', { nzDuration: 5000 }
            );
            this.loadTeams(this.selectedTab);
          });
      else
        this._main.update<Team>("teams", model.id, model)
          .subscribe(r => {
            this.isVisible = false;
            this.isConfirmLoading = false;
            this._notify.create(
              "success",
              'Equipo actualizado correctamente',
              'Logramos actualizar al equipo, vamos a recargar la lista;', { nzDuration: 5000 }
            );
            this.loadTeams(this.selectedTab);
          });
    }
    else {
      console.log(this.form.controls["id"].errors);
      console.log(this.form.controls["TeamLogo"].errors);
      console.log(this.form.controls["TeamName"].errors);
      console.log(this.form.controls["LeagueID"].errors);
    }
  }
  public confirmDelete(item: Team): void {
    // console.log(item);
    this._main.delete("teams", item.id)
      .subscribe(
        r => this._notify.create("success",
          'Equipo Eliminado!',
          'Si te arepentiste.... Ni modos; puedes volver a agregarlo', { nzDuration: 3000 }
        ),
        err => {
          this._notify.create("danger",
            'UPS! Ocurrio un error',
            'Puedes volver a intentarlo, o consultar en la Matrix que puede ser!!!', { nzDuration: 5000 }
          )
        },
        () => {
          this.loadTeams(this.selectedTab);
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
