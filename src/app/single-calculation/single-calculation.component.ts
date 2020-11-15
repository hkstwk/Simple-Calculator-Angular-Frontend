import {Component, OnInit} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {CalcResponse} from "../dto/CalcResponse";
import {SimpleCalculatorService} from "../service/simple-calculator.service";
import {delay} from "rxjs/internal/operators";
import {Utils} from "../util/utils";

@Component({
    selector: 'app-single-calculation',
    templateUrl: 'single-calculation.component.html',
    styleUrls: ['single-calculation.component.css']
})

export class SingleCalculationComponent implements OnInit {

    public operators = Utils.OPERATORS;

    public calcdata: CalcResponse;

    constructor(private calcService: SimpleCalculatorService) {
      this.calcdata = Utils.generateRandomCalculation();
    }

    ngOnInit() {
    }

    calculate(data: CalcResponse): void {
        this.calcdata.result = "... simulating some insane complex calculation by delaying 2,5 seconds ...";
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
      this.calcdata = Utils.generateRandomCalculation();
    }

}
