import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ConnectService } from '../../service/connect.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-displayuserdetails',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule],
  templateUrl: './displayuserdetails.component.html',
  styleUrl: './displayuserdetails.component.css'
})
export class DisplayuserdetailsComponent {
  restUserData: ConnectService;
  constructor( restUserDataRef:ConnectService,private router:Router)
  {
    this.restUserData=restUserDataRef;

  }
}
