import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SingleCalculationComponent} from "./single-calculation/single-calculation.component";
import {MultipleCalculationsComponent} from "./multiple-calculations/multiple-calculations.component";
import {Component} from "@angular/core";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockSingleCalculationComponent,
        MockMultipleCalculationsComponent
      ],

    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'simple-calculator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Simple Calculator Challenge');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.ui.segment').textContent).toContain('Simple Calculator');
  });
});

@Component({
  selector: 'app-single-calculation',
  template: ''
})
class MockSingleCalculationComponent {
}

@Component({
  selector: 'app-multiple-calculations',
  template: ''
})
class MockMultipleCalculationsComponent {
}
