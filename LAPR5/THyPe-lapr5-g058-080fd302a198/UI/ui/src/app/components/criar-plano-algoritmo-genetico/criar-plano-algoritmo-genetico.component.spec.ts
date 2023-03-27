import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPlanoAlgoritmoGeneticoComponent } from './criar-plano-algoritmo-genetico.component';

describe('CriarPlanoAlgoritmoGeneticoComponent', () => {
  let component: CriarPlanoAlgoritmoGeneticoComponent;
  let fixture: ComponentFixture<CriarPlanoAlgoritmoGeneticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPlanoAlgoritmoGeneticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarPlanoAlgoritmoGeneticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
