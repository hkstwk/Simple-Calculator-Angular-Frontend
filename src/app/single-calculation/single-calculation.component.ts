import {Component, OnInit} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {CalcResponse} from "../dto/CalcResponse";
import {SimpleCalculatorService} from "../service/simple-calculator.service";
import {delay} from "rxjs/internal/operators";

@Component({
    selector: 'app-calculator',
    templateUrl: 'single-calculation.component.html',
    styleUrls: ['single-calculation.component.css']
})

export class SingleCalculationComponent implements OnInit {

    private operators = ['+', '-', '*', '/', '% (not supported; will show error handling'];

    public calcdata: CalcResponse;

    constructor(private calcService: SimpleCalculatorService) {
      this.calcdata = new CalcResponse();
      this.reset();
    }

    ngOnInit() {
    }

    calculate(data: CalcResponse): void {
        this.calcdata.result = "... simulating some serious calculations by hard coded delay of 2,5 seconds ...";
        this.calcService.doSingleCalculation(data)
          .pipe(delay(2500))
          .subscribe({
                next: this.handleResp.bind(this),
                error: this.handleError.bind(this)
          })
    }

    private handleResp(resp: CalcResponse): void {
        this.calcdata.result = resp.result;
        console.log("responseBody {}", resp);
    }

    private handleError(err: HttpErrorResponse): void {
        console.log(err);
    }

    reset(): void {
      this.calcdata.leftOperand = Math.floor((Math.random()*100));
      this.calcdata.operator= this.operators[Math.floor(Math.random()*5)];
      this.calcdata.rightOperand = Math.floor((Math.random()*10));
      this.calcdata.result = "";
    }

}
