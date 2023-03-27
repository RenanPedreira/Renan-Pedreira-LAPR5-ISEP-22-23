import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorLogisticaComponent } from './gestor-logistica.component';

describe('GestorLogisticaComponent', () => {
  let component: GestorLogisticaComponent;
  let fixture: ComponentFixture<GestorLogisticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorLogisticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorLogisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
