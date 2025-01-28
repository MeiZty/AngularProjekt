import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckModusComponent } from './check-modus.component';

describe('CheckModusComponent', () => {
  let component: CheckModusComponent;
  let fixture: ComponentFixture<CheckModusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckModusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckModusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
