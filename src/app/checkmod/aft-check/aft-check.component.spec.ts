import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AftCheckComponent } from './aft-check.component';

describe('AftCheckComponent', () => {
  let component: AftCheckComponent;
  let fixture: ComponentFixture<AftCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AftCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AftCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
