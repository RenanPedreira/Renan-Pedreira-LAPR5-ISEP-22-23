import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEmpacotamentoComponent } from './criar-empacotamento.component';

describe('CriarEmpacotamentoComponent', () => {
  let component: CriarEmpacotamentoComponent;
  let fixture: ComponentFixture<CriarEmpacotamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarEmpacotamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarEmpacotamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
