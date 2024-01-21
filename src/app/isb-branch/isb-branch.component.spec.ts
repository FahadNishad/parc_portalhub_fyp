import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsbBranchComponent } from './isb-branch.component';

describe('IsbBranchComponent', () => {
  let component: IsbBranchComponent;
  let fixture: ComponentFixture<IsbBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsbBranchComponent]
    });
    fixture = TestBed.createComponent(IsbBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
