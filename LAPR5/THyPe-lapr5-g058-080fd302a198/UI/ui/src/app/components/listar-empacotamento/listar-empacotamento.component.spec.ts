import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEmpacotamentoComponent } from './listar-empacotamento.component';

describe('ListarEmpacotamentoComponent', () => {
  let component: ListarEmpacotamentoComponent;
  let fixture: ComponentFixture<ListarEmpacotamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEmpacotamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEmpacotamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
