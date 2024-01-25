import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdminComponent } from './delete-admin.component';

describe('DeleteAdminComponent', () => {
  let component: DeleteAdminComponent;
  let fixture: ComponentFixture<DeleteAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAdminComponent]
    });
    fixture = TestBed.createComponent(DeleteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
