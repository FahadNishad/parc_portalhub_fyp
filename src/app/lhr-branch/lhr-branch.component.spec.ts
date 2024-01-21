import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhrBranchComponent } from './lhr-branch.component';

describe('LhrBranchComponent', () => {
  let component: LhrBranchComponent;
  let fixture: ComponentFixture<LhrBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LhrBranchComponent]
    });
    fixture = TestBed.createComponent(LhrBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
