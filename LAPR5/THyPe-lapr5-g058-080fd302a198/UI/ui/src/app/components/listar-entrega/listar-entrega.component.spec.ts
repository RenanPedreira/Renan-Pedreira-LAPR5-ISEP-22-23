import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEntregaComponent } from './listar-entrega.component';

describe('ListarEntregaComponent', () => {
  let component: ListarEntregaComponent;
  let fixture: ComponentFixture<ListarEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEntregaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
