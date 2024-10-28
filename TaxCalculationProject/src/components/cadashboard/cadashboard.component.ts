import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConnectService } from '../../service/connect.service';

@Component({
  selector: 'app-cadashboard',
  standalone: true,
  imports: [FormsModule, NgFor,RouterModule],
  templateUrl: './cadashboard.component.html',
  styleUrl: './cadashboard.component.css'
})
export class CAdashboardComponent {
  restUserData: ConnectService;
  constructor( restUserDataRef:ConnectService,private router:Router)
  {
    this.restUserData=restUserDataRef;

  }
  // constructor(private route : Router){}
  a:number=0;
  
  caAuthorizedUsers = [1,3,4];
  ngOnInit(){
    this.restUserData.getAllUsers();
  }
}
