export class CalcResponse {
    leftOperand: number;
    rightOperand: number;
    operator: string;
    result: string;

    constructor(leftOperand: number, rightOperand: number, operator: string, calcResult: string) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
        this.result = calcResult;
    }
}
