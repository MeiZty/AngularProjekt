import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AftComponent } from './aft.component';

describe('AftComponent', () => {
  let component: AftComponent;
  let fixture: ComponentFixture<AftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
