import {Component} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {SimpleCalculatorService} from "../../service/simple-calculator.service";
import {delay} from "rxjs/internal/operators";
import {Utils} from "../../util/utils";
import {IPayload} from "../../interface/ipayload";


@Component({
    selector: 'app-single-calculation',
    templateUrl: 'single-calculation.component.html',
    styleUrls: ['single-calculation.component.css']
})
export class SingleCalculationComponent {

    public operators = Utils.OPERATORS;

    public calcdata: IPayload;

    constructor(private calcService: SimpleCalculatorService) {
      this.calcdata = Utils.generateRandomCalculation();
    }

    calculate(data: IPayload): void {
        this.calcdata.result = "... simulating some insane complex calculation by delaying 2,5 seconds ...";
        this.calcService.doSingleCalculation(data)
          .pipe(delay(1000))
          .subscribe({
                next: (resp: IPayload) => this.handleResp(resp),
                error: (err) => this.handleError(err)
          })
    }

    private handleResp(resp: IPayload): void {
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
