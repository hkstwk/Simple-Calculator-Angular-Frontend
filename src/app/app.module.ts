import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MultipleCalculationsComponent} from "./multiple-calculations/multiple-calculations.component";
import {SingleCalculationComponent} from "./single-calculation/single-calculation.component";
import {SimpleCalculatorService} from "./service/simple-calculator.service";

@NgModule({
  declarations: [
    AppComponent,
    SingleCalculationComponent,
    MultipleCalculationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SimpleCalculatorService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {
}
