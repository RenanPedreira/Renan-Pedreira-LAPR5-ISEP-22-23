import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarArmazemComponent } from './criar-armazem.component';

describe('CriarArmazemComponent', () => {
  let component: CriarArmazemComponent;
  let fixture: ComponentFixture<CriarArmazemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarArmazemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarArmazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
