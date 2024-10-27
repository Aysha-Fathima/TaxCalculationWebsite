import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../service/connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientmanagement',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './clientmanagement.component.html',
  styleUrl: './clientmanagement.component.css'
})
export class ClientmanagementComponent {
  restUserData: ConnectService;
  constructor( restUserDataRef:ConnectService,private router:Router)
  {
    this.restUserData=restUserDataRef;

  }

  ngOnInit(){
    this.restUserData.getAllUsers();
  }

}
