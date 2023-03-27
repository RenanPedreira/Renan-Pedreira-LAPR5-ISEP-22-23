import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmpacotamentoComponent } from './update-empacotamento.component';

describe('UpdateEmpacotamentoComponent', () => {
  let component: UpdateEmpacotamentoComponent;
  let fixture: ComponentFixture<UpdateEmpacotamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmpacotamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmpacotamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
