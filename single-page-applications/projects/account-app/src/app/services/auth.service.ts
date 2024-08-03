import { Injectable } from '@angular/core';
import {Handler} from "express";
import {HandlersAccountDetailsDTO} from "../backend-api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: HandlersAccountDetailsDTO = { };

  constructor() { }

  setUserData(data: HandlersAccountDetailsDTO): void {
    this.userData = data;
  }

  getUserData(): HandlersAccountDetailsDTO {
    return this.userData;
  }}
