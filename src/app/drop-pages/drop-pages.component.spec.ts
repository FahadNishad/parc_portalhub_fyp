import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropPagesComponent } from './drop-pages.component';

describe('DropPagesComponent', () => {
  let component: DropPagesComponent;
  let fixture: ComponentFixture<DropPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropPagesComponent]
    });
    fixture = TestBed.createComponent(DropPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
