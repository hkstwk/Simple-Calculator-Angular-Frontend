/**
 * Created by harm on 19-11-20.
 */
import {TestBed, getTestBed} from "@angular/core/testing";
import {HttpTestingController, HttpClientTestingModule} from "@angular/common/http/testing";
import {SimpleCalculatorService} from "./simple-calculator.service";
import {IPayload} from "../interface/ipayload";

export const mockAddRequest: IPayload = {
  leftOperand: 33,
  rightOperand: 22,
  operator: "+"
}

export const mockAddResult: IPayload = {
  leftOperand: 33,
  rightOperand: 22,
  operator: "+",
  result: "55"
}

export const mockDivideByZeroRequest: IPayload = {
  leftOperand: 33,
  rightOperand: 0,
  operator: "/"
}

export const mockDivideByZeroResponse: IPayload = {
  leftOperand: 33,
  rightOperand: 0,
  operator: "0",
  result: "ArithmeticException - can't divide by zero"
}

describe("SimpleCalculatorService unit test", () => {

  let injector: TestBed;
  let service: SimpleCalculatorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimpleCalculatorService]
    });

    injector = getTestBed();
    service = injector.inject(SimpleCalculatorService);
    httpTestingController = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("adds two numbers using POST request to /single endpoint", () => {

    // Arrange
    let testRequestBody : IPayload = mockAddRequest;
    console.log("Test input requestbody: {}", testRequestBody);

    // Act
    service.doSingleCalculation(testRequestBody)
      .subscribe(resp => {
          console.log("Returned data: {}", resp);
          console.log("Returned mockAddResult: {}", mockAddResult);
          // Assert result
          expect(resp).toEqual(mockAddResult)
      });

    // Assert
    const req = httpTestingController.expectOne('http://localhost:8080/single');

    // Assert that the request is a POST.
    expect(req.request.method).toEqual('POST');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(mockAddResult);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it("divides by zero and returns exception in result", () => {

    // Arrange
    let testRequestBody : IPayload = mockDivideByZeroRequest;
    console.log("Test input requestbody: {}", testRequestBody);

    // Act
    service.doSingleCalculation(testRequestBody)
      .subscribe(resp => {
        console.log("Returned data: {}", resp);
        console.log("Returned mockDivideByZeroResult: {}", mockDivideByZeroResponse);
        // Assert result
        expect(resp).toEqual(mockDivideByZeroResponse)
      });

    // Assert
    const req = httpTestingController.expectOne('http://localhost:8080/single');

    // Assert that the request is a POST.
    expect(req.request.method).toEqual('POST');

    // Assert that the responsetype is set to JSON
    expect(req.request.responseType).toEqual('json');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(mockDivideByZeroResponse);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

});


