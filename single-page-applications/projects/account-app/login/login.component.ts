import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected username: string;
  protected password: string;
  constructor(
    private http: HttpClient,
  ) {
    this.username = "";
    this.password = "";
  }
  onLogin() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

  fetchUserData(userId: string) {
    const apiUrl = `https://yourapi.com/users/${userId}`;
    this.http.get(apiUrl).subscribe(
      response => {
        console.log('User data:', response);
        // Handle the response data here
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}
