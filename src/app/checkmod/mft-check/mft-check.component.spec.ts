import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MftCheckComponent } from './mft-check.component';

describe('MftCheckComponent', () => {
  let component: MftCheckComponent;
  let fixture: ComponentFixture<MftCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MftCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MftCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
