import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLibrosComponent } from './detalle-libros.component';

describe('DetalleLibrosComponent', () => {
  let component: DetalleLibrosComponent;
  let fixture: ComponentFixture<DetalleLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleLibrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
