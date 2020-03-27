import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlimentoPage } from './alimento.page';

describe('AlimentoPage', () => {
  let component: AlimentoPage;
  let fixture: ComponentFixture<AlimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
