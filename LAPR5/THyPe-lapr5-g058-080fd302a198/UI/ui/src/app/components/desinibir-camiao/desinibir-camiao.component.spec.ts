import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesinibirCamiaoComponent } from './desinibir-camiao.component';

describe('DesinibirCamiaoComponent', () => {
  let component: DesinibirCamiaoComponent;
  let fixture: ComponentFixture<DesinibirCamiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesinibirCamiaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesinibirCamiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
