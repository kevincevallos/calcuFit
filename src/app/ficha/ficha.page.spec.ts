import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Ficha } from './ficha.page';

describe('Ficha', () => {
  let component: Ficha;
  let fixture: ComponentFixture<Ficha>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ficha ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Ficha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
