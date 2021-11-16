import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { AppComponent } from './app.component';
import { Menu } from './shared/interfaces/Menu.interface';
import { MainService } from './shared/services/main.service';

describe('AppComponent', () => {
  let service: MainService;
  let notify: NzNotificationService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;
  let compoent: AppComponent;

  let dataResponse: Menu[] = [
    {
      "title": "Dashboard",
      "icon": "dashboard",
      "items": [
        {
          "url": "/welcome",
          "text": "Conteos"
        }
      ]
    },
    {
      "title": "Equipos",
      "icon": "team",
      "items": [
        {
          "url": "/teams/list",
          "text": "Ver los equipos"
        }
      ]
    },
    {
      "title": "Jugadores",
      "icon": "user",
      "items": [
        {
          "url": "/players/list/0",
          "text": "Ver todos los jugadores"
        }
      ]
    }
  ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NzNotificationModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        MainService,
        NzNotificationService
      ]
    }).compileComponents();
    injector = getTestBed();
    service = TestBed.inject(MainService);
    notify = TestBed.inject(NzNotificationService);
    httpMock = TestBed.inject(HttpTestingController)
    fixture = TestBed.createComponent(AppComponent);
    compoent = fixture.componentInstance;
    el = fixture.debugElement;
    const req = httpMock.expectOne("http://localhost:3000/menu");
    req.flush(dataResponse);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(compoent).toBeTruthy();
  });

  it('Se valida la data del menu', () => {
    fixture.detectChanges();
    expect(compoent.menus.length).toBe(3, "debería regresar 3 items de menu");
    dataResponse.forEach((el, i) => {
      expect(el.title).toEqual(compoent.menus[i].title, "El nombre del menú no es correcto");
      expect(el.icon).toEqual(compoent.menus[i].icon, "El icono del menú no es correcto");
    });
  });
  it('Se valida el render del menú', () => {
    fixture.detectChanges();
    const list = el.queryAll(By.css(".menu-list li.manu-list-pricipal-item"));
    expect(list.length).toBe(3, "Deberían haber solo 3 items li");
  });
  it('Se validan datos del header', () => {
    fixture.detectChanges();
    const img = el.query(By.css(".sidebar-logo a img"));
    expect(img).toBeTruthy();
    expect(img.properties.src).toBe("https://www.clipartmax.com/png/middle/319-3198676_eel-meme-icon-by-swiftypaws101-digital-art.png", "La imagen que se muestra no es correcta");
    const name = el.query(By.css(".sidebar-logo a h1"));
    expect(name).toBeTruthy();
    expect(name.nativeElement.textContent).toBe("Squaads Challenge", "El nombre rederizado no es correcto");
  });
});
