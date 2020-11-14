export class CalcRequest {
    leftOperand: number;
    rightOperand: number;
    operator: string;

    constructor(leftOperand: number, rightOperand: number, operator: string) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }
}
