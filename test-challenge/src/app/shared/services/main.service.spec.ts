import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MainService } from './main.service';
import { Team } from '../interfaces/Team.interfase';

describe('MainService', () => {
  let service: MainService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MainService
      ]
    }).compileComponents();
    injector = getTestBed();
    service = TestBed.inject(MainService);
    httpMock = TestBed.inject(HttpTestingController)


  });
  afterEach(() => {
    httpMock.verify();
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('se valida un get', () => {
    service.getAll<Team>("teams")
      .subscribe(r => {
        expect(r).toBeTruthy('No se regresaron datos');
        expect(r.length).toBe(3, "Deberían ser 3 registros");
        expect(r[0].TeamName).toBe("Dazzlesphere edition", "El nombre debería ser: Dazzlesphere edition");
      });
    const req = httpMock.expectOne("http://localhost:3000/teams");
    expect(req.request.method).toBe('GET', 'debería mandar una solicitud get');
    req.flush([{
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
    }]);
  });
});
