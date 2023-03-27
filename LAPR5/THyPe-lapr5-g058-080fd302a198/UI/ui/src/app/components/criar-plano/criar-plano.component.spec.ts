import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPlanoComponent } from './criar-plano.component';

describe('CriarPlanoComponent', () => {
  let component: CriarPlanoComponent;
  let fixture: ComponentFixture<CriarPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPlanoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
