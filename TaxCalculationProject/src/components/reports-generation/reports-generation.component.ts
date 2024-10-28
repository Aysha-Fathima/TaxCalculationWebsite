import { Component } from '@angular/core';
import { ConnectService } from '../../service/connect.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ReportsService } from '../../service/reports.service';

@Component({
  selector: 'app-reports-generation',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './reports-generation.component.html',
  styleUrl: './reports-generation.component.css'
})
export class ReportsGenerationComponent {
  restUserData: ReportsService;
  connection:ConnectService;
  constructor( restUserDataRef:ReportsService,
    private connectionServiceRef:ConnectService,
    private router:Router
    )
  {
    this.restUserData=restUserDataRef;
    this.connection=connectionServiceRef;

  }

  ngOnInit(){
    // this.restUserData.getDetails();
    // this.restUserData.getcaDetails();
    this.restUserData.getAllTaxDetailsAllUsersForCA();
  }

  // restUserData: ReportsService;
  // anotherService: AnotherService; // Declare your second service

  // constructor(
  //   restUserDataRef: ReportsService,
  //   private anotherServiceRef: AnotherService, // Inject the second service
  //   private router: Router
  // ) {
  //   this.restUserData = restUserDataRef;
  //   this.anotherService = anotherServiceRef; // Assign the injected service
  // }
}
