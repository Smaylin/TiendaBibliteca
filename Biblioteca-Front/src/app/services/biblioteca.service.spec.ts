import { TestBed } from '@angular/core/testing';

import { BibliotecaService } from './biblioteca.service';

describe('BibliotecaService', () => {
  let service: BibliotecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibliotecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
