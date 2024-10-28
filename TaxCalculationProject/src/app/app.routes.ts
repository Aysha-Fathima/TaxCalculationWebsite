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
import { UserprofileComponent } from '../components/userprofile/userprofile.component';
import { ReportsGenerationComponent } from '../components/reports-generation/reports-generation.component';
import { AuthService } from '../service/auth.service';

export const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"register", component:RegisterComponent},
    {path:"login", component:LoginComponent},
    {path:"aboutUs", component:AboutUsComponent},
    // { path: 'dashboard', component: DashboardComponent, canActivate:[CombinedAuthGuard]},
    {path:"dashboard", component:DashboardComponent,canActivate:[AuthService]},
    // { path: 'taxcalculator', component: TaxCalculatorComponent, canActivate:[CombinedAuthGuard]},
    { path: 'taxcalculator', component: TaxCalculatorComponent,canActivate:[AuthService]},
    // { path: 'cadashboard', component: CAdashboardComponent, canActivate:[CAauthGuard]},
    { path: 'cadashboard', component: CAdashboardComponent,canActivate:[AuthService]},
    { path: 'clientmanagement',component:ClientmanagementComponent,canActivate:[AuthService]},
    { path: 'displayuserdetails',component:DisplayuserdetailsComponent,canActivate:[AuthService]},
    { path: 'userprofile',component:UserprofileComponent,canActivate:[AuthService]},
    { path: 'reports', component:ReportsGenerationComponent,canActivate:[AuthService]},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
