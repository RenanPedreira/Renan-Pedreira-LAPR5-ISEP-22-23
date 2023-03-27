import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InibirContaComponent } from './inibir-conta.component';

describe('InibirContaComponent', () => {
  let component: InibirContaComponent;
  let fixture: ComponentFixture<InibirContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InibirContaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InibirContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
