import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {HttpClientModule} from "@angular/common/http";
import { ScheduleComponent } from "./schedule.component";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule
  ],
  declarations: [
    ScheduleComponent
  ],
  exports:      [ ScheduleComponent ],
  providers:    [ DataService ]
})
export class ScheduleModule { }
