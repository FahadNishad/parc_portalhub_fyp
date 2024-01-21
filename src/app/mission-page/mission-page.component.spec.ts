import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionPageComponent } from './mission-page.component';

describe('MissionPageComponent', () => {
  let component: MissionPageComponent;
  let fixture: ComponentFixture<MissionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MissionPageComponent]
    });
    fixture = TestBed.createComponent(MissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
