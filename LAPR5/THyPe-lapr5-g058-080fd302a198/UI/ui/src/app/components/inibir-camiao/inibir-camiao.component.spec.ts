import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InibirCamiaoComponent } from './inibir-camiao.component';

describe('InibirCamiaoComponent', () => {
  let component: InibirCamiaoComponent;
  let fixture: ComponentFixture<InibirCamiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InibirCamiaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InibirCamiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
