import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SftComponent } from './sft.component';

describe('SftComponent', () => {
  let component: SftComponent;
  let fixture: ComponentFixture<SftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
