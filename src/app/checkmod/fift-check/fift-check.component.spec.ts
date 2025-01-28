import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiftCheckComponent } from './fift-check.component';

describe('FiftCheckComponent', () => {
  let component: FiftCheckComponent;
  let fixture: ComponentFixture<FiftCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiftCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiftCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
