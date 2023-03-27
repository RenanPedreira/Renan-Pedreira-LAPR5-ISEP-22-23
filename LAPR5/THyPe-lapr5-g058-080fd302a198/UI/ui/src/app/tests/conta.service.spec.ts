import { TestBed } from '@angular/core/testing';

import { ContaService } from '../services/conta.service';
import { MessageService } from '../services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('ContaService', () => {

  let service = new  ContaService(HttpClient,MessageService);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

spyOn(service, 'createConta');

let result = service.createConta("OL","ola@gmail.com","123456789","Ola123345","Admin");
expect(result).toBe("ola@gmail.com");


});
