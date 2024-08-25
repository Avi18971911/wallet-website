import { Injectable } from '@angular/core';
import {DtoAccountDetailsDTO, DtoKnownAccountDTO} from "../backend-api";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userDataSubject: BehaviorSubject<DtoAccountDetailsDTO | undefined> = new BehaviorSubject<DtoAccountDetailsDTO | undefined>(undefined);
  public userData$: Observable<DtoAccountDetailsDTO | undefined> = this.userDataSubject

  constructor() { }

  setUserData(data: DtoAccountDetailsDTO): void {
    this.userDataSubject.next(data)
  }

  clearUserData(): void {
    this.userDataSubject.next(undefined)
  }

  getKnownAccounts$(): Observable<DtoKnownAccountDTO[]> {
    return this.userData$.pipe(
      map((userData) => userData?.knownAccounts ?? [])
    )
  }

  getFirstName$(): Observable<string | undefined> {
    return this.userData$.pipe(
      map((userData) => userData?.person.firstName)
    )
  }

  getCurrentBalance$(): Observable<number | undefined> {
    return this.userData$.pipe(
      map((userData) => userData?.availableBalance)
    )
  }

}
