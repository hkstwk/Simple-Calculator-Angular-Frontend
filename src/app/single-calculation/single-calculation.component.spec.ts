import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCalculationComponent } from './single-calculation.component';
import {SimpleCalculatorService} from "../service/simple-calculator.service";
import {HttpHandler} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('SingleColculationComponent', () => {
  let component: SingleCalculationComponent;
  let fixture: ComponentFixture<SingleCalculationComponent>;
  let service: SimpleCalculatorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCalculationComponent ],
      providers: [SimpleCalculatorService, HttpClient, HttpHandler],
      imports: [ FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCalculationComponent);
    service = TestBed.inject(SimpleCalculatorService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
