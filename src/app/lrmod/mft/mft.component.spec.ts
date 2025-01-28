import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MftComponent } from './mft.component';

describe('MftComponent', () => {
  let component: MftComponent;
  let fixture: ComponentFixture<MftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
