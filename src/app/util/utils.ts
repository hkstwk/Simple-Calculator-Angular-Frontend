import {OnInit} from "@angular/core";
import {CalcResponse} from "../dto/CalcResponse";

export class Utils {

  public static OPERATORS : string [] = ['+', '-', '*', '/', '% (not supported; will show error handling'];
  public static NUMBER_OF_CALCULATIONS: number = 3;

  public static generateRandomCalculation(): CalcResponse {
    return new CalcResponse(
      Math.floor((Math.random() * 100)),
      Math.floor((Math.random() * 10)),
      this.OPERATORS[Math.floor(Math.random() * 5)],
      "");
  }

  public static getDummyData() : CalcResponse[] {
    let dummyData : CalcResponse[] = [];
    for (let i = 0; i < this.NUMBER_OF_CALCULATIONS; i++) {
      dummyData.push(this.generateRandomCalculation());
    }
    return dummyData;
  }
}
