import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";

export const routes: Routes = [
  { path: "", redirectTo: "/Login", pathMatch: "full" },
  { path: 'Login', component: LoginComponent },
  { path: 'Welcome', component: WelcomeComponent },
];
