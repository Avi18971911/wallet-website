import { Injectable } from '@angular/core';
import {AccountsService, DtoAccountDetailsDTO, DtoAccountLoginDTO,} from "../backend-api";
import {BehaviorSubject, Observable, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(
    private backendAccountService: AccountsService,
  ) {}

  login(
    loginDetails: DtoAccountLoginDTO,
    successCallback: (data: DtoAccountDetailsDTO) => void,
    errorCallback: (error: any) => void
  ){

    const observer: Observer<DtoAccountDetailsDTO> = {
        next: (data: DtoAccountDetailsDTO) => {
          this.isAuthenticatedSubject.next(true);
          successCallback(data);
        },
        error: (error: any) => {
          this.isAuthenticatedSubject.next(false);
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
