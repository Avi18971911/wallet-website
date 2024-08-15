import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {DashboardComponent} from "./components/welcome/dashboard/dashboard.component";
import {TransferWalletBankComponent} from "./components/welcome/transfer/transfer-wallet-bank.component";
import {InputDetailsComponent} from "./components/welcome/transfer/input-details/input-details.component";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  {
    path: 'welcome',
    component: WelcomeComponent,
    children: [
      { path: 'account/dashboard', component: DashboardComponent },
      {
        path: 'transfer/to-other-walletbank',
        component: TransferWalletBankComponent,
        children: [
          { path: 'input-details', component: InputDetailsComponent}
        ],
      },
    ],
  },
];
