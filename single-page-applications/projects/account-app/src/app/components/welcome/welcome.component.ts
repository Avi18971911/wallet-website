import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.router.navigate(['dashboard'], {relativeTo: this.route}).catch((error) => {
      console.error(error);
    });
  }
}
