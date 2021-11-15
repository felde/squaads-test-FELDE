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

  /**
   * #### Description
   * Especifica el tipo de boton a utilizar
   * #### Version
   * since: V1.0.0
   * #### Example
   * 
   * Size btn of list component
   */
  public sizeBtn: NzButtonSize = "large";

  /**
   * #### Description
   * Arreglo de los jugadores a bindear en html
   * #### Version
   * since: V1.0.0
   * Players  of list component
   */
  public players: Player[] = [];

  /**
   * #### Description
   * Respaldo del datasource orignal para plicar los filtros de manera local
   * #### Version
   * since: V1.0.0
   * Back player of list component
   */
  public backPlayer: Player[] = [];

  /**
   * #### Description
   * Jugador seleccionado para editar
   * #### Version
   * since: V1.0.0
   * Selected player of list component
   */
  public selectedPlayer: Player = {};

  /**
   * #### Description
   * Equipo seleccionado en el dropdown para utilizar en el crud del jugador
   * #### Version
   * since: V1.0.0
   * Selected team of list component
   */
  public selectedTeam: any;

  /**
   * #### Description
   * Listado de equipos, utilizado cuando se entra al listado de todos los jugadores y armar el dropdown
   * #### Version
   * since: V1.0.0
   * All teams of list component
   */
  public allTeams: Team[] = [];

  /**
   * #### Description
   * Bandera para mostrar u ocutar el modal
   * #### Version
   * since: V1.0.0
   * Show combo of list component
   */
  public showCombo: boolean = false;

  /**
   * #### Description
   * Badera para mostrar la animación de trabajando en boton del modal
   * #### Version
   * since: V1.0.0
   * Determines whether visible is
   */
  public isVisible = false;
  public isConfirmLoading = false;


  /**
   * #### Description
   * Se ocupa para mostrar si es un nuevo registro o edición en el modal
   * #### Version
   * since: V1.0.0
   * Title modal of list component
   */
  public titleModal: string = "";

  /**
   * #### Description
   * Formulario para manipulación de modelo jugador
   * #### Version
   * since: V1.0.0
   * Form  of list component
   */
  public form!: FormGroup;


  /**
   * #### Description
   * Se respalda en esta variable el parametro de llegara si es filtrado por un equipo o es listado global
   * #### Version
   * since: V1.0.0
   * Id param of list component
   */
  private idParam: string = ";"


  /**
   * #### Description
   * Constructor
   * #### Version
   * since: V1.0.0
   * Creates an instance of list component.
   * @param _AR 
   * @param _main 
   * @param formBuilder 
   * @param _notify 
   */
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

  ngOnInit(): void { }


  /**
   * #### Description
   * Valida si existe un parametro de equipo y de ser correcto filtra la data por ese equipo y desactiva banderas de filtros
   * #### Version
   * since: V1.0.0
   * Checks params
   */
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

  /**
   * #### Description
   * Recarga de jugadores cuando se hace un insert, update o delete
   * #### Version
   * since: V1.0.0
   * Realoads players
   * @param item 
   */
  private realoadPlayers(item: Team): void {
    this._main.getAll<Player>("players")
      .pipe(map(rs => (this.idParam != "0") ? rs.filter(fil => fil.teamId === this.idParam) : rs))
      .subscribe(r => {
        this.backPlayer = r;
        this.filterPlayer(item);
      });
  }


  /**
   * #### Description
   * Se filtra la data por el equipo seleccionado
   * #### Version
   * since: V1.0.0
   * Filters player
   * @param item 
   */
  public filterPlayer(item: Team): void {
    this.selectedTeam = item;
    this.players = this.backPlayer.filter(r => r.teamId === item.id);
  }

  /**
   * #### Description
   * Metodo para mostrar el equipo asignado en la tarjeta del jugador
   * #### Version
   * since: V1.0.0
   * Gets team name
   * @param item 
   * @returns team name 
   */
  public getTeamName(item: Player): string {
    let x: string = "";
    this.allTeams.filter(r => { if (r.id == item.teamId) x = r.TeamName ? r.TeamName : "" });
    return x;
  }

  /**
   * #### Description
   * Se habilita el modal y asigna la data le formulario dependiendo si es nuevo registro o edición
   * #### Version
   * since: V1.0.0
   * Opens modal
   * @param [item] 
   */
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

  /**
   * #### Description
   * Se deshabilita el modal de edición jugador
   * #### Version
   * since: V1.0.0
   * Handles cancel
   */
  public handleCancel(): void {
    this.isVisible = false;
  }

  /**
   * #### Description
   * Evento para asignar obtener el archivo seleccionado del fileinput y a la vez convertirla en base64 y asignarla el modelo del formulario
   * #### Version
   * since: V1.0.0
   * Files selected
   * @param ev 
   */
  public fileSelected(ev: any): void {
    console.log(ev.files);
    this._main.getImageBase64(ev).then(r => {
      if (r != null) {
        this.form.controls.Avatar.patchValue(r);
      }
    });
  }

  /**
   * #### Description
   * Metoho para generar un nuevo jugador o actualizarlo
   * #### Version
   * since: V1.0.0
   * Determines whether submit on
   */
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

  /**
   * #### Description
   * Se lanza una confirmación de eliminación de jugador
   * #### Version
   * since: V1.0.0
   * Confirms delete
   * @param item 
   */
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

  /**
   * #### Description
   * Se manda notificación de cancelación de eliminación de jugador
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

  /**
   * #### Description
   * Evento para filtrar por nombre de jugador con el input del front
   * #### Version
   * since: V1.0.0
   * Determines whether keypress event on
   * @param event 
   */
  public onKeypressEvent(event: any): void {
    this.players = this.backPlayer.filter(r => r.teamId === this.selectedTeam.id).filter(r => r.PlayerName?.indexOf(event.target.value) != -1);
  }
}
