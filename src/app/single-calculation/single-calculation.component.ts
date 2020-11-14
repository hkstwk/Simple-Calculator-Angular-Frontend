import {Component, OnInit} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {CalcResponse} from "../dto/CalcResponse";
import {SimpleCalculatorService} from "../service/simple-calculator.service";

@Component({
    selector: 'app-calculator',
    templateUrl: 'single-calculation.component.html',
    styleUrls: ['single-calculation.component.css']
})

export class SingleCalculationComponent implements OnInit {

    operators = ['+', '-', '*', '/', '% (not supported; will show error handling'];

    public loading: boolean = false;
    public data: any;

    public leftOperand: number;
    public rightOperand: number;
    public operator: string;
    public result: string;

    constructor(private calcService: SimpleCalculatorService) {
      this.reset();
    }


    ngOnInit() {
    }

    calculate(data: any): void {
        this.loading = true;
        this.calcService.doSingleCalculation(data)
            .subscribe(
                resp => this.handleResp(resp),
                error => this.handleError(error))
        this.loading = false;
    }

    private handleResp(resp: CalcResponse): void {
        this.result = resp.result;
        console.log("responseBody {}", resp);
        console.log("result set to ", this.result);
    }


    private handleError(err: HttpErrorResponse): void {
        console.log(err);
    }

    reset(): void {
      this.leftOperand = Math.floor((Math.random()*100));
      this.rightOperand = Math.floor((Math.random()*10));
      this.operator = this.operators[Math.floor(Math.random()*5)];
      this.result = "";
    }

}
