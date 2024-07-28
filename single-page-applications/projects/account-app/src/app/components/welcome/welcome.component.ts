import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
