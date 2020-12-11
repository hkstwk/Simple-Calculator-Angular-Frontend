import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IPayload} from "../interface/ipayload";

@Injectable()
export class SimpleCalculatorService {

    private readonly URL_SINGLE = "http://localhost:8080/single";
    private readonly URL_MULTIPLE = "http://localhost:8080/multiple";

    constructor(protected httpClient: HttpClient) {
    }

    public doSingleCalculation(request: IPayload): Observable<IPayload> {
      console.log(request);
        return this.httpClient
            .post<IPayload>(this.URL_SINGLE, request);
    }

    public doMultipleCalculations(request: IPayload[]): Observable<IPayload[]> {
      console.log(request);
        return this.httpClient
            .post<IPayload[]>(this.URL_MULTIPLE, request);
    }

}
