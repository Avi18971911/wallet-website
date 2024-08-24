import { Injectable } from '@angular/core';
import {AccountsService, DtoAccountDetailsDTO, DtoAccountLoginDTO,} from "../backend-api";
import {BehaviorSubject, Observable, Observer, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  public loginResponse$ = new Subject<DtoAccountDetailsDTO>();

  constructor(
    private backendAccountService: AccountsService,
  ) {}

  login(
    loginDetails: DtoAccountLoginDTO,
    successCallback: () => void,
    errorCallback: (error: any) => void
  ){

    const observer: Observer<DtoAccountDetailsDTO> = {
        next: (data: DtoAccountDetailsDTO) => {
          this.isAuthenticatedSubject.next(true);
          this.loginResponse$.next(data);
          successCallback();
        },
        error: (error: any) => {
          errorCallback(error);
        },
        complete: () => {

        }
      }

    this.backendAccountService.accountsLoginPost(loginDetails).subscribe(observer)
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
  }
}
