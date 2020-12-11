import {Component} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {SimpleCalculatorService} from "../../service/simple-calculator.service";
import {Utils} from "../../util/utils";
import {IPayload} from "../../interface/ipayload";

@Component({
  selector: 'app-multiple-calculations',
  templateUrl: 'multiple-calculations.component.html',
  styleUrls: ['multiple-calculations.component.css']
})
export class MultipleCalculationsComponent {

  public operators = Utils.OPERATORS;

  public numberOfRandomData : number = Utils.NUMBER_OF_CALCULATIONS;
  public canDoMultipleCalc: boolean = false;
  public calcdata: IPayload;
  public multipleCalcData: IPayload[];

  constructor(private calcService: SimpleCalculatorService) {
    this.calcdata = Utils.generateRandomCalculation();
  }

  addToRequest(data: IPayload) {

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
        next: (resp: IPayload[]) => this.handleMultiResp(resp),
        error: (err) => this.handleMultiError(err)
      })
  }

  private handleMultiResp(resp: IPayload[]): void {
    console.log("responseBody {}", resp);
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

