import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietaPage } from './dieta.page';

describe('DietaPage', () => {
  let component: DietaPage;
  let fixture: ComponentFixture<DietaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
