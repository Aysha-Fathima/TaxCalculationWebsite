import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../service/connect.service';
import { AuthService } from '../../service/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  connect : ConnectService;
  auth: AuthService;
  constructor(a:ConnectService,b:AuthService){this.connect=a;this.auth=b;}

  // restUserData: TaxService;
  // constructor( restUserDataRef:TaxService,private router:Router)
  // {
  //   this.restUserData=restUserDataRef;

  // }

  // login(data:any){
  //   this.obj.login(data).subscribe((data)=>{
  //     if(data){
  //       this.obj.setAuth(true);
  //       this.router.navigate(['/taxcalculator']);
  //       this.obj.getTaxDetails(data);
  //     }
  //     else{
  //       alert('Invalie email or password');
  //     }
  //   });
  // }
}
