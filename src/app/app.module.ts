import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SimpleCalculatorComponent} from './simple-calculator/simple-calculator.component';
import {HttpClientModule} from "@angular/common/http";
import {SimpleCalculatorService} from "./simple-calculator/simple-calculator.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SimpleCalculatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SimpleCalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
