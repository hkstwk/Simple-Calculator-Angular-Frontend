import {Component, OnInit} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {CalcResponse} from "./CalcResponse";
import {SimpleCalculatorService} from "./simple-calculator.service";
import {CalcRequest} from "./CalcRequest";

@Component({
    selector: 'app-calculator',
    templateUrl: './simple-calculator.component.html',
    styleUrls: ['./simple-calculator.component.css']
})

export class SimpleCalculatorComponent implements OnInit {

    operators = ['+', '-', '*', '/', '% (not supported; will show error handling'];

    public canDoMultipleCalc: boolean = false;

    public loading: boolean = false;
    public data: any;

    public leftOperand: number;
    public rightOperand: number;
    public operator: string;
    public result: string;

    public testMultipleCalcRequest: CalcRequest[];
    public testMultipleCalcResponse: CalcResponse[];

    constructor(private calcService: SimpleCalculatorService) {
        this.initializeInputs();
    }


    ngOnInit() {
    }

    addToRequest(data: CalcRequest) {
        if (this.data){
            this.data = null;
        }
        if (!this.canDoMultipleCalc) {
            this.testMultipleCalcRequest = [data];
            this.canDoMultipleCalc = true;
            this.testMultipleCalcResponse = null;
        } else {
            this.testMultipleCalcRequest.push(data);
        }
    }

    calculate(data: any): void {
        this.loading = true;
        if (this.testMultipleCalcResponse){
            this.testMultipleCalcResponse = null;
        }
        if (this.testMultipleCalcRequest){
            this.testMultipleCalcRequest = null;
        }
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
        this.data = resp;
    }


    private handleError(err: HttpErrorResponse): void {
        this.data = err;
    }

    calculateMultiple(): void {
        this.loading = true;
        this.calcService.doMultipleCalculations(this.testMultipleCalcRequest)
            .subscribe(
                resp => this.handleMultiResp(resp),
                error => this.handleMultiError(error))
        this.loading = false;
    }

    private handleMultiResp(resp: Array<CalcResponse>): void {
        console.log("responseBody {}", resp);
        this.testMultipleCalcRequest = null;
        this.canDoMultipleCalc = false;
        this.testMultipleCalcResponse = resp;
    }


    private handleMultiError(err: HttpErrorResponse): void {
        console.log("errorBody {}", err);
    }

    reset(): void {
        this.loading = false;
        this.data = null;
        this.initializeInputs();
        this.testMultipleCalcResponse = null;
        this.testMultipleCalcRequest = null;
        this.canDoMultipleCalc = false;
    }

    private initializeInputs() {
        this.leftOperand = 6;
        this.rightOperand = 12;
        this.operator = "-";
        this.result = "";
    }

    public getDummyData() {
        if (this.testMultipleCalcResponse){
            this.testMultipleCalcResponse = null;
        }
        if (this.data){
            this.data = null;
        }
        if (!this.testMultipleCalcRequest){
            this.testMultipleCalcRequest = [new CalcRequest(5, 2, "+"),
                new CalcRequest(6, 3, "/"),
                new CalcRequest(29, 6, "*"),
                new CalcRequest(29, 0, "/"),
                new CalcRequest(4, 8, "-"),
                new CalcRequest(4, 8, "^")
            ];
            this.canDoMultipleCalc = true;
        }
    }
}
