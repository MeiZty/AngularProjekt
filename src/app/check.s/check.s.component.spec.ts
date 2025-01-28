import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSComponent } from './check.s.component';

describe('CheckSComponent', () => {
  let component: CheckSComponent;
  let fixture: ComponentFixture<CheckSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
