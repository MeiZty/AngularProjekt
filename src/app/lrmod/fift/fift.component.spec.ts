import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiftComponent } from './fift.component';

describe('FiftComponent', () => {
  let component: FiftComponent;
  let fixture: ComponentFixture<FiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
