import {Injectable} from '@angular/core';

// rxjs
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CalcRequest} from "./CalcRequest";
import {CalcResponse} from "./CalcResponse";

@Injectable()
export class SimpleCalculatorService {

    private readonly URL = "http://localhost:8080/single";
    private readonly URL2 = "http://localhost:8080/multiple";

    constructor(protected httpClient: HttpClient) {
    }

    public doSingleCalculation(request: CalcRequest): Observable<CalcResponse> {
        return this.httpClient
            .post<CalcResponse>(this.URL, request);
    }

    public doMultipleCalculations(request: Array<CalcRequest>): Observable<Array<CalcResponse>> {
        return this.httpClient
            .post<Array<CalcResponse>>(this.URL2, request);
    }

}
