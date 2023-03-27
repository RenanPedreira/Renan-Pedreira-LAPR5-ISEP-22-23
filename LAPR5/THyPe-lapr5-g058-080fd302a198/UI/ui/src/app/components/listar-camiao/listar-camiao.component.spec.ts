import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCamiaoComponent } from './listar-camiao.component';

describe('ListarCamiaoComponent', () => {
  let component: ListarCamiaoComponent;
  let fixture: ComponentFixture<ListarCamiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCamiaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCamiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
