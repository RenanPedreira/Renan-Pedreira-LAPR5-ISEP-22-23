import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarCamiaoComponent } from './atualizar-camiao.component';

describe('AtualizarCamiaoComponent', () => {
  let component: AtualizarCamiaoComponent;
  let fixture: ComponentFixture<AtualizarCamiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarCamiaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarCamiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
