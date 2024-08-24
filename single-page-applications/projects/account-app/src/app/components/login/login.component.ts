import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DtoAccountDetailsDTO, DtoAccountLoginDTO} from "../../backend-api";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('shake', [
      transition('void => *', [
        animate('0.5s', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-10px)', offset: 0.25 }),
          style({ transform: 'translateX(10px)', offset: 0.5 }),
          style({ transform: 'translateX(-10px)', offset: 0.75 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})

export class LoginComponent {
  protected username: string = "";
  protected password: string = "";
  protected errorMessage: string = "";
  protected loginSuccessCallback: (data: DtoAccountDetailsDTO) => void =
    (data) => {
      this.errorMessage = "";
      this.accountService.setUserData(data);
      this.router.navigate(['/welcome'], { state: { accountData: data }});
    }

  protected loginErrorCallback: (error: any) => void =
    (error) => {
      this.errorMessage = "Sorry, you have entered invalid credentials.";
    }

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
  ) { }
  onLogin() {
    this.fetchUserData(this.username, this.password);
  }

  fetchUserData(userId: string, password: string) {
    const loginPayload: DtoAccountLoginDTO = {
      username: userId,
      password: password
    }
    this.authService.login(loginPayload, this.loginSuccessCallback, this.loginErrorCallback);
  }
}
