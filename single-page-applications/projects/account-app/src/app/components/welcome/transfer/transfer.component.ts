import { Component } from '@angular/core';
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    ProgressBarComponent
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {

}
