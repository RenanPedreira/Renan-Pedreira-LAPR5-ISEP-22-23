import { TestBed } from '@angular/core/testing';

import { EmpacotamentoService } from '../services/empacotamento.service';

describe('EmpacotamentoService', () => {
  let service: EmpacotamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpacotamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
