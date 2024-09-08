import { Injectable } from '@angular/core';
import {DtoAccountDetailsDTO, DtoKnownAccountDTO} from "../backend-api";
import {BehaviorSubject, map, Observable} from "rxjs";
import {CurrentAccountDetails} from "../models/current-account-details";

export interface KnownAccount {
  accountNumber: string;
  accountHolder: string;
  accountType: string;
}

export interface AccountDetails {
  accountNumber: string;
  accountType: string;
  accountHolderFirstName: string;
  accountHolderLastName: string;
  availableBalance: number;
  accountId: string;
  knownAccounts: KnownAccount[];
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userDataSubject: BehaviorSubject<AccountDetails | undefined> =
    new BehaviorSubject<AccountDetails | undefined>(undefined);
  public userData$: Observable<AccountDetails | undefined> = this.userDataSubject

  constructor() { }

  setUserData(data: DtoAccountDetailsDTO): void {
    const accountDetails = this.fromDtoAccountDetailsDTO(data)
    this.userDataSubject.next(accountDetails)
  }

  clearUserData(): void {
    this.userDataSubject.next(undefined)
  }

  getKnownAccounts$(): Observable<KnownAccount[]> {
    return this.userData$.pipe(
      map((userData) => userData?.knownAccounts ?? [])
    )
  }

  getFirstName$(): Observable<string | undefined> {
    return this.userData$.pipe(
      map((userData) => userData?.accountHolderFirstName)
    )
  }

  getCurrentBalance$(): Observable<number | undefined> {
    return this.userData$.pipe(
      map((userData) => userData?.availableBalance)
    )
  }

  getCurrentAccountDetails$(): Observable<CurrentAccountDetails | undefined> {
    return this.userData$.pipe(
      map((userData) => {
        if (!userData) {
          return undefined
        }
        return {
          accountNumber: userData.accountNumber,
          accountType: userData.accountType,
          accountHolder: `${userData.accountHolderFirstName} ${userData.accountHolderLastName}`,
        }
      })
    )
  }

  private fromDtoAccountDetailsDTO(dtoAccountDetailsDTO: DtoAccountDetailsDTO): AccountDetails {
    return {
      accountNumber: dtoAccountDetailsDTO.accountNumber,
      accountType: dtoAccountDetailsDTO.accountType,
      accountHolderFirstName: dtoAccountDetailsDTO.person.firstName,
      accountHolderLastName: dtoAccountDetailsDTO.person.lastName,
      availableBalance: dtoAccountDetailsDTO.availableBalance,
      accountId: dtoAccountDetailsDTO.id,
      knownAccounts: dtoAccountDetailsDTO.knownAccounts.map(this.fromDtoKnownAccountDTO),
    }
  }

  private fromDtoKnownAccountDTO(dtoKnownAccountDTO: DtoKnownAccountDTO): KnownAccount {
    return {
      accountNumber: dtoKnownAccountDTO.accountNumber,
      accountHolder: dtoKnownAccountDTO.accountHolder,
      accountType: dtoKnownAccountDTO.accountType,
    }
  }
}
