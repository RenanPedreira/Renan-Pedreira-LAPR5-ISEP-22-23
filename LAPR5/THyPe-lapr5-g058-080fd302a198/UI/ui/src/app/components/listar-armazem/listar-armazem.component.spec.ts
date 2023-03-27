import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarArmazemComponent } from './listar-armazem.component';

describe('ListarArmazemComponent', () => {
  let component: ListarArmazemComponent;
  let fixture: ComponentFixture<ListarArmazemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarArmazemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarArmazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
