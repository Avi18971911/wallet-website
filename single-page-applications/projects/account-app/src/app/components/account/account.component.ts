import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {RouteNames} from "../../route-names";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.router.navigate([RouteNames.DASHBOARD], {relativeTo: this.route}).catch((error) => {
      console.error(error);
    });
  }
}
