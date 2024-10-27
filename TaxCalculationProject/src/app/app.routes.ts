import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { TaxCalculatorComponent } from '../components/tax-calculator/tax-calculator.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guards';
import { CAdashboardComponent } from '../components/cadashboard/cadashboard.component';
import { CAauthGuard } from '../guards/CAauth.guard';
import { CombinedAuthGuard } from '../guards/combined.guards';
import { ClientmanagementComponent } from '../components/clientmanagement/clientmanagement.component';
import { DisplayuserdetailsComponent } from '../components/displayuserdetails/displayuserdetails.component';

export const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"register", component:RegisterComponent},
    {path:"login", component:LoginComponent},
    {path:"aboutUs", component:AboutUsComponent},
    // { path: 'dashboard', component: DashboardComponent, canActivate:[CombinedAuthGuard]},
    {path:"dashboard", component:DashboardComponent},
    // { path: 'taxcalculator', component: TaxCalculatorComponent, canActivate:[CombinedAuthGuard]},
    { path: 'taxcalculator', component: TaxCalculatorComponent},
    // { path: 'cadashboard', component: CAdashboardComponent, canActivate:[CAauthGuard]},
    { path: 'cadashboard', component: CAdashboardComponent},
    { path: 'clientmanagement',component:ClientmanagementComponent },
    { path: 'displayuserdetails',component:DisplayuserdetailsComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
