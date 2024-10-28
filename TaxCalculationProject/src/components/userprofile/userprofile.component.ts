import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UserprofileService } from '../../service/userprofile.service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule,FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  restUserData: UserprofileService;
  constructor( restUserDataRef:UserprofileService,private router:Router)
  {
    this.restUserData=restUserDataRef;

  }
  // ngOnInit(){
  //   this.restUserData.getDetails();
  //   this.restUserData.getcaDetails();
  // }
}
