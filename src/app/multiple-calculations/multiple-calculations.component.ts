import {Component, OnInit} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {CalcResponse} from "../dto/CalcResponse";
import {SimpleCalculatorService} from "../service/simple-calculator.service";
import {CalcRequest} from "../dto/CalcRequest";

@Component({
  selector: 'app-multiple-calculations',
  templateUrl: './multiple-calculations.component.html',
  styleUrls: ['./multiple-calculations.component.css']
})
export class MultipleCalculationsComponent implements OnInit {

  operators = ['+', '-', '*', '/', '% (not supported; will show error handling'];

  public canDoMultipleCalc: boolean = false;
  public calcdata: CalcResponse;
  public multipleCalcData: CalcResponse[];

  constructor(private calcService: SimpleCalculatorService) {
    this.reset();
  }

  ngOnInit() {
  }

  addToRequest(data: CalcResponse) {

    // If there is no input data then initialize array with data
    if (!this.canDoMultipleCalc) {
      this.multipleCalcData = [data];
      this.canDoMultipleCalc = true;
    } else {
      // else add data to array of calculation data
      // and generate new random inout data
      this.multipleCalcData.push(data);
    }
    this.calcdata = this.generateRandomCalculation();
  }

  calculateMultiple(): void {
    this.calcService.doMultipleCalculations(this.multipleCalcData)
      .subscribe({
        next: this.handleMultiResp.bind(this),
        error: this.handleMultiError.bind(this)
      })
  }

  private handleMultiResp(resp: Array<CalcResponse>): void {
    console.log("responseBody {}", resp);
    this.testMultipleCalcRequest = null;
    this.canDoMultipleCalc = false;
    this.multipleCalcData = resp;
  }

  private handleMultiError(err: HttpErrorResponse): void {
    console.log("errorBody {}", err);
  }

  reset(): void {
    this.calcdata = this.generateRandomCalculation();
    this.multipleCalcData = null;
    this.canDoMultipleCalc = false;
  }

  private generateRandomCalculation(): CalcResponse {
    return new CalcResponse(
      Math.floor((Math.random() * 100)),
      Math.floor((Math.random() * 10)),
      this.operators[Math.floor(Math.random() * 5)],
      "");
  }

  public getDummyData() {
    this.multipleCalcData = [];
    for (let i = 0; i < 10; i++) {
      this.multipleCalcData.push(this.generateRandomCalculation());
    }
    this.canDoMultipleCalc = true;
  }
}

