import {Component, OnInit} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {CalcResponse} from "../dto/CalcResponse";
import {SimpleCalculatorService} from "../service/simple-calculator.service";
import {Utils} from "../util/utils";

@Component({
  selector: 'app-multiple-calculations',
  templateUrl: './multiple-calculations.component.html',
  styleUrls: ['./multiple-calculations.component.css']
})
export class MultipleCalculationsComponent implements OnInit {

  operators = ['+', '-', '*', '/', '% (not supported; will show error handling'];

  public numberOfRandomData : number = Utils.NUMBER_OF_CALCULATIONS;
  public canDoMultipleCalc: boolean = false;
  public calcdata: CalcResponse;
  public multipleCalcData: CalcResponse[];

  constructor(private calcService: SimpleCalculatorService) {
    this.calcdata = Utils.generateRandomCalculation();
  }

  ngOnInit() {
  }

  addToRequest(data: CalcResponse) {

    // If there is no input data then initialize array with data
    if (!this.canDoMultipleCalc) {
      this.multipleCalcData = [data];
    } else {
      // else add data to array of calculation data
      // and generate new random inout data
      this.multipleCalcData.push(data);
    }
    this.canDoMultipleCalc = true;
    this.calcdata = Utils.generateRandomCalculation();
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
    this.calcdata = Utils.generateRandomCalculation();
    this.multipleCalcData = null;
    this.canDoMultipleCalc = false;
  }

  public getDummyData() {
    if (this.multipleCalcData) {
      this.multipleCalcData = this.multipleCalcData.concat(Utils.getDummyData());
    } else {
      this.multipleCalcData = Utils.getDummyData();
    }
    this.canDoMultipleCalc = true;
  }
}

