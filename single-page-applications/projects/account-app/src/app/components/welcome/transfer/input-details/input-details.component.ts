import {Component, OnInit} from '@angular/core';
import {DateFormatService} from "../../../../services/date-format.service";

@Component({
  selector: 'app-input-details',
  standalone: true,
  imports: [],
  templateUrl: './input-details.component.html',
  styleUrl: './input-details.component.css'
})
export class InputDetailsComponent implements OnInit {
  protected dateTime: string = "";
  constructor(private dateService: DateFormatService) { }

  ngOnInit() {
    this.dateTime = this.getDateTimeAsString();
  }

  getDateTimeAsString(): string {
    const currentDateTime = this.dateService.getCurrentDate();
    return `${currentDateTime.month} ${currentDateTime.day}, ${currentDateTime.year} ${currentDateTime.time} ${currentDateTime.location}`;
  }
}
