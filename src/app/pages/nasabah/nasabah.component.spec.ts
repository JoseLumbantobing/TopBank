import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasabahComponent } from './nasabah.component';

describe('NasabahComponent', () => {
  let component: NasabahComponent;
  let fixture: ComponentFixture<NasabahComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NasabahComponent]
    });
    fixture = TestBed.createComponent(NasabahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
