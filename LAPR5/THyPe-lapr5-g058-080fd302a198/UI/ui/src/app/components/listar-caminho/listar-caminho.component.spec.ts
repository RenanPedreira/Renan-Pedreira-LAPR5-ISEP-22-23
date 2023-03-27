import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCaminhoComponent } from './listar-caminho.component';

describe('ListarCaminhoComponent', () => {
  let component: ListarCaminhoComponent;
  let fixture: ComponentFixture<ListarCaminhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCaminhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCaminhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
