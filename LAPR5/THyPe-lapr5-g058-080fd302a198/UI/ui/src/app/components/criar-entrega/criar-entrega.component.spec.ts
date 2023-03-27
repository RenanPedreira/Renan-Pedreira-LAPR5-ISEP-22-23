import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEntregaComponent } from './criar-entrega.component';

describe('CriarEntregaComponent', () => {
  let component: CriarEntregaComponent;
  let fixture: ComponentFixture<CriarEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarEntregaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
