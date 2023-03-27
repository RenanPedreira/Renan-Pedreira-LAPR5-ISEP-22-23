import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlanoComponent } from './listar-plano.component';

import { HttpClientTestingModule} from '@angular/common/http/testing'
import { of } from 'rxjs';

describe('ListarPlanoComponent', () => {
  let component: ListarPlanoComponent;
  let fixture: ComponentFixture<ListarPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ListarPlanoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});
