import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserprofileService } from '../../service/userprofile.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // constructor(private route : Router){}
  // createNew(){
  //   console.log('creating new component');
  //   this.route.navigate(['/taxcalculator']);
  // }

  openResources() {
    window.open('https://www.incometax.gov.in/iec/foportal/', '_blank'); // Replace with your URL
  }
  restUserData: UserprofileService;
  constructor( restUserDataRef:UserprofileService,private router:Router)
  {
    this.restUserData=restUserDataRef;

  }

  ngOnInit(){
    this.restUserData.getDetails();
    this.restUserData.getcaDetails();
  }
}
