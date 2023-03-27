import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaComponent } from './criar-conta.component';
import { HttpClientTestingModule} from '@angular/common/http/testing'
import { of, throwError } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { Conta } from 'src/app/domain/conta';
import { contains } from 'cypress/types/jquery';

describe('CriarContaComponent', () => {
  let component: CriarContaComponent;
  let fixture: ComponentFixture<CriarContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarContaComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    let conta: Conta = {
      nome: "Coo",
      email: "coo@gmail.com",
      telefone : 123456789,
      password : "Ola123456",
      role : "Admin"
    }

    const fakeContaService = jasmine.createSpyObj('ContaService', ['createConta']);
    fakeContaService.createConta.and.returnValue(of({
      data: {
        status: 200,
        body: conta
      },

      error: {
        status: 404
      }      
    }));

    component = new CriarContaComponent(fakeContaService,fakeMessageService);
    component.add("Coo","coo@gmail.com","123456789","Ola123456","Admin");

    expect(fakeContaService.createConta).calledOnce;
    expect(component.result).toBe("coo@gmail.com");
  })

  it('should fail creation', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeContaService = jasmine.createSpyObj('ContaService', ['createConta']);
    fakeContaService.createPathing.and.returnValue(throwError({
      error: "error"
    }));

    component = new CriarContaComponent(fakeContaService,fakeMessageService);

    component.add("Coo","coo@gmail.com","1234567","Ol","Admin");
    

    expect(fakeContaService.createConta).calledOnce;
    expect(component.result).toBe("");
  })
  
});
