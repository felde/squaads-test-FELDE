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

  /**
   * #### Description
   * Espeficia el tipo de boton a redenrizar
   * #### Version
   * since: V1.0.0
   * Size btn of list component
   */
  public sizeBtn: NzButtonSize = "large";

  /**
   * #### Description
   * Listado de ligas
   * #### Version
   * since: V1.0.0
   * Leagues  of list component
   */
  public leagues: League[] = [];

  /**
   * #### Description
   * Objecto que almacena localmente que liga se esta manipulando
   * #### Version
   * since: V1.0.0
   * Selected league of list component
   */
  public selectedLeague: League = {};

  /**
   * #### Description
   * Se almanacena localmente que item del carrucel esta activo
   * #### Version
   * since: V1.0.0
   * Selected tab of list component
   */
  public selectedTab: number = 0;

  /**
   * #### Description
   * Listado de quipos pertenecientes a la liga activa en elc carrusel
   * #### Version
   * since: V1.0.0
   * Teams  of list component
   */
  public teams: Team[] = [];

  /**
   * #### Description
   * Bandera utilizadas para mostrar el modal
   * #### Version
   * since: V1.0.0
   * Determines whether loading teams is
   */
  public isLoadingTeams: boolean = false;
  public isVisible = false;
  public isConfirmLoading = false;


  /**
   * #### Description
   * Título a mostrar en el modal
   * #### Version
   * since: V1.0.0
   * Title modal of list component
   */
  public titleModal: string = "";

  /**
   * #### Description
   * Formulario para manipular los objetos de tipo team
   * #### Version
   * since: V1.0.0
   * Form  of list component
   */
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

  /**
   * #### Description
   * obtiene los equipos de la liga
   * #### Version
   * since: V1.0.0
   * Loads teams
   * @param event 
   */
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

  /**
   * #### Description
   * Habilita o deshabilita el modal del formulario
   * #### Version
   * since: V1.0.0
   * Opens modal
   * @param [item] 
   */
  public openModal(item?: Team): void {
    console.log(item);
    this.titleModal = item ? "Edición de equipo: " + item?.TeamName : "Nuevo equipo";
    let team: Team =
    {
      id: item ? item.id : "",
      TeamLogo: item ? item.TeamLogo : "",
      TeamName: item ? item.TeamName : "",
      LeagueID: this.selectedLeague.id ? this.selectedLeague.id : ""
    };
    this.form.patchValue(team);
    this.isVisible = true;
  }

  /**
   * #### Description
   * Deshabilita el modal
   * #### Version
   * since: V1.0.0
   * Handles cancel
   */
  public handleCancel(): void {
    this.isVisible = false;
  }


  /**
   * #### Description
   * Evento lanzado cuando se selecciona un archivo en el fileinput
   * #### Version
   * since: V1.0.0
   * Files selected
   * @param ev 
   */
  public fileSelected(ev: any): void {
    console.log(ev.files);
    this._main.getImageBase64(ev).then(r => {
      if (r != null) {
        this.form.controls.TeamLogo.patchValue(r);
      }
    });
  }

  /**
   * #### Description
   * Método submit para gradar los datos de un equipo
   * #### Version
   * since: V1.0.0
   * Determines whether submit on
   */
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

  /**
   * #### Description
   * LAza un pop de confirmación de eliminación de equipo
   * #### Version
   * since: V1.0.0
   * Confirms delete
   * @param item 
   */
  public confirmDelete(item: Team): void {
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

  /**
   * #### Description
   * Lanza un mensaje de cancelación de eliminación de quipo
   * #### Version
   * since: V1.0.0
   * Cancels cancel
   * @param item 
   */
  public cancelCancel(item: Team): void {
    this._notify.create(
      "warning",
      'Menos mal te pregunte!!!',
      'Eliminación cancelada', { nzDuration: 1500 }
    );
  }
}
