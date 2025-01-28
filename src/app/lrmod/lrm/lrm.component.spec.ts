import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrmComponent } from './lrm.component';

describe('LrmComponent', () => {
  let component: LrmComponent;
  let fixture: ComponentFixture<LrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
