import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SftCheckComponent } from './sft-check.component';

describe('SftCheckComponent', () => {
  let component: SftCheckComponent;
  let fixture: ComponentFixture<SftCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SftCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SftCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
