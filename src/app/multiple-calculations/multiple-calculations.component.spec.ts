import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleCalculationsComponent } from './multiple-calculations.component';

describe('MultipleCalculationsComponent', () => {
  let component: MultipleCalculationsComponent;
  let fixture: ComponentFixture<MultipleCalculationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleCalculationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
