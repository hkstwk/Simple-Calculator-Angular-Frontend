import {IPayload} from "../interface/ipayload";

export class Utils {

  public static OPERATORS: string [] = ['+', '-', '*', '/', '% (not supported; will show error handling'];
  public static NUMBER_OF_CALCULATIONS: number = 3;

  public static generateRandomCalculation(): IPayload {
    return {
      leftOperand: Math.floor((Math.random() * 100)),
      rightOperand: Math.floor((Math.random() * 10)),
      operator: this.OPERATORS[Math.floor(Math.random() * 5)]
    }
  };

  public static getDummyData(): IPayload[] {
    let dummyData: IPayload[] = [];
    for (let i = 0; i < this.NUMBER_OF_CALCULATIONS; i++) {
      dummyData.push(this.generateRandomCalculation());
    }
    return dummyData;
  }
}
