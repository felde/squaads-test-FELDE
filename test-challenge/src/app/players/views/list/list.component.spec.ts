import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { Player } from 'src/app/shared/interfaces/Player.interface';
import { Team } from 'src/app/shared/interfaces/Team.interfase';
import { MainService } from 'src/app/shared/services/main.service';

import { ListComponent } from './list.component';

describe('ListPlayersComponent', () => {
  let service: MainService;
  let notify: NzNotificationService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<ListComponent>;
  let el: DebugElement;
  let compoent: ListComponent;
  let fb: FormBuilder;

  let dataResponseTeams: Team[] = [
    {
      "id": "8154f4cb-246b-4bf9-bc64-51f8661b6781",
      "TeamLogo": "https://robohash.org/autemvoluptatemdolorem.png?size=250x250&set=set1",
      "TeamName": "Dazzlesphere edition",
      "LeagueID": "a249ed6a-ad8e-4692-9758-5d19454752f3"
    },
    {
      "TeamName": "Vipe",
      "id": "7cbd9c6d-e002-4d40-8bfa-f07e943f17a4",
      "TeamLogo": "https://robohash.org/nesciuntvelitpossimus.png?size=250x250&set=set1",
      "LeagueID": "4ddb5753-679c-4500-906a-f7b2a5f3f95c"
    },
    {
      "TeamName": "Geba",
      "id": "e0f76bd2-af63-43bf-be84-0d633ad541fb",
      "TeamLogo": "https://robohash.org/facereimpeditdolores.png?size=250x250&set=set1",
      "LeagueID": "0a886c97-032e-4f37-8caf-24d875b2ac21"
    },
    {
      "TeamName": "Eamia",
      "id": "98778af9-cef9-4aa9-8a89-f978704821d4",
      "TeamLogo": "https://robohash.org/doloremaccusamusea.png?size=250x250&set=set1",
      "LeagueID": "e1ebc55c-925e-4ce4-bd66-49c41b4b3895"
    },
    {
      "TeamName": "Shuffletag",
      "id": "1d0bb8f3-0584-4222-90d7-e7a6c3a5100b",
      "TeamLogo": "https://robohash.org/velitfugitiure.png?size=250x250&set=set1",
      "LeagueID": "2b44c97f-c1f8-4731-a627-4bdedcca7ece"
    }
  ];
  let dataResponsePlayers: Player[] = [
    {
      "id": "ca85cfed-69d8-4e03-9259-960195bde933",
      "Avatar": "https://robohash.org/etconsequunturreprehenderit.png?size=250x250&set=set1",
      "PlayerName": "Auguste Penwarden edited",
      "teamId": "8154f4cb-246b-4bf9-bc64-51f8661b6781"
    },
    {
      "PlayerName": "Hildegarde Barkas",
      "id": "1e76b39a-78e6-471e-8c4f-d4d7b0a655ff",
      "Avatar": "https://robohash.org/cumquesuntmaiores.png?size=250x250&set=set1",
      "teamId": "7cbd9c6d-e002-4d40-8bfa-f07e943f17a4"
    },
    {
      "PlayerName": "Polly Berresford",
      "id": "e0ab0995-3d1e-4cc4-9a7a-4512402f4599",
      "Avatar": "https://robohash.org/nihilsittempore.png?size=250x250&set=set1",
      "teamId": "e0f76bd2-af63-43bf-be84-0d633ad541fb"
    },
    {
      "PlayerName": "Danny Baugham",
      "id": "ffedef72-0c06-4e27-9b1f-2a47a94da535",
      "Avatar": "https://robohash.org/voluptateminnon.png?size=250x250&set=set1",
      "teamId": "98778af9-cef9-4aa9-8a89-f978704821d4"
    },
    {
      "PlayerName": "Amelie Hassan",
      "id": "a933aea8-a3af-4d52-ac93-1779f201e607",
      "Avatar": "https://robohash.org/commodieavel.png?size=250x250&set=set1",
      "teamId": "1d0bb8f3-0584-4222-90d7-e7a6c3a5100b"
    },
    {
      "PlayerName": "Petronia Kirkham",
      "id": "805abaa4-4a4d-4688-8bcd-8b5f8d53d3bb",
      "Avatar": "https://robohash.org/etnesciuntquibusdam.png?size=250x250&set=set1",
      "teamId": "72434eb3-b64f-49ff-9070-99780c5122af"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NzNotificationModule,
        FormsModule,
        NzDropDownModule
      ],
      declarations: [
        ListComponent
      ],
      providers: [
        MainService,
        NzNotificationService,
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                players: dataResponsePlayers
              }
            },
            queryParams: of({ idT: '0' }),
            params: of({ idT: '0' })
          }
        }
      ]
    }).compileComponents();
    injector = getTestBed();
    service = TestBed.inject(MainService);
    notify = TestBed.inject(NzNotificationService);
    httpMock = TestBed.inject(HttpTestingController)
    fb = TestBed.inject(FormBuilder)
    fixture = TestBed.createComponent(ListComponent);
    compoent = fixture.componentInstance;
    el = fixture.debugElement;
    const req = httpMock.expectOne("http://localhost:3000/teams");
    req.flush(dataResponseTeams);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(compoent).toBeTruthy();
  });
  it('se valida la data de equipos', () => {
    fixture.detectChanges();
    expect(compoent.allTeams.length).toBe(5, "Esta prueba deben ser 5")
  });
  it('se valida la data de jugadores', () => {
    fixture.detectChanges();
    expect(compoent.backPlayer).toBeTruthy("No se tomarón los datos del snapshot");
    expect(compoent.backPlayer.length).toBe(6, "Esta prueba deben ser 6")
  });
});
