import { Injectable } from '@angular/core';
import {DtoAccountDetailsDTO} from "../backend-api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: DtoAccountDetailsDTO = {
    accountNumber: "",
    accountType: "",
    availableBalance: 0,
    id: "",
    knownAccounts: [],
    person: {
      firstName: "",
      lastName: "",
    },
    username: "",
    createdAt: "",
  };

  constructor() { }

  setUserData(data: DtoAccountDetailsDTO): void {
    this.userData = data;
  }

  getUserData(): DtoAccountDetailsDTO {
    return this.userData;
  }}
