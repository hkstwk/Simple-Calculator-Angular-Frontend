import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultipleCalculationsComponent} from './multiple-calculations.component';
import {SimpleCalculatorService} from "../../service/simple-calculator.service";
import {HttpClient} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('MultipleCalculationsComponent', () => {
  let component: MultipleCalculationsComponent;
  let fixture: ComponentFixture<MultipleCalculationsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [MultipleCalculationsComponent],
      providers: [SimpleCalculatorService, HttpClient, HttpHandler],
      imports: [ FormsModule],
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
