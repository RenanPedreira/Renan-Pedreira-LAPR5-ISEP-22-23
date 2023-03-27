import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorArmazemComponent } from './gestor-armazem.component';

describe('GestorArmazemComponent', () => {
  let component: GestorArmazemComponent;
  let fixture: ComponentFixture<GestorArmazemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorArmazemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorArmazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
