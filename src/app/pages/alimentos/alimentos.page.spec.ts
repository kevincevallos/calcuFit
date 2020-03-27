import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlimentosPage } from './alimentos.page';

describe('AlimentosPage', () => {
  let component: AlimentosPage;
  let fixture: ComponentFixture<AlimentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
