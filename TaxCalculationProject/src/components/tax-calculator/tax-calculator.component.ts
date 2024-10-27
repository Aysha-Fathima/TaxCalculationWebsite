import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ConnectService } from '../../service/connect.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-income-tax-calculator',
  standalone: true, // Make the component standalone
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.css'],
  imports: [NgIf, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule] // Import NgIf and FormsModule
})

export class TaxCalculatorComponent {
  restUserData: ConnectService;
  constructor( restUserDataRef:ConnectService,private router:Router)
  {
    this.restUserData=restUserDataRef;

  }

  // constructor(private conn:ConnectService){};
  taxDetails = {
    assessmentYear: '2024-25',
    totalAnnualIncome: 0,
    totalDeductions: 0
  };
  send : any;
  oldRegimeTax = 0;
  newRegimeTax = 0;
  calculateTax(formdata: any) {
    this.taxDetails.totalAnnualIncome = formdata.value.totalAnnualIncome;
    this.taxDetails.totalDeductions = formdata.value.totalDeductions;
    
    const income = formdata.value.totalAnnualIncome;
    const deductions = formdata.value.totalDeductions || 0;
    const taxableIncome = income - deductions;

    this.oldRegimeTax = this.calculateOldRegimeTax(taxableIncome, formdata.value.ageGroup);
    this.newRegimeTax = this.calculateNewRegimeTax(income);
    this.oldRegimeTax *= 1.04; // cess 4 percent
    this.newRegimeTax *= 1.04;
    this.send = {
        "totalAnnualIncome": this.taxDetails.totalAnnualIncome,
        "totalDeductions": this.taxDetails.totalDeductions,
        "oldRegimeTax": this.oldRegimeTax,
        "newRegimeTax": this.newRegimeTax,
        // "userId":localStorage.getItem("userid"),
        // "caId":localStorage.getItem("caId"),
        "age":formdata.value.ageGroup,
        "assessmentYear":formdata.value.assessmentYear
    };
    this.restUserData.saveTaxCalculations(this.send);
}


  private calculateOldRegimeTax(income: number, ageGroup: string): number {
    let tax = 0;

    // Define tax slabs based on old regime and age
    if (ageGroup === 'below60') {
      if (income <= 250000) tax = 0;
      else if (income <= 500000) tax = (income - 250000) * 0.05;
      else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.2;
      else tax = 112500 + (income - 1000000) * 0.3;
    } else if (ageGroup === 'between60and79') {
      if (income <= 300000) tax = 0;
      else if (income <= 500000) tax = (income - 300000) * 0.05;
      else if (income <= 1000000) tax = 10000 + (income - 500000) * 0.2;
      else tax = 110000 + (income - 1000000) * 0.3;
    } else if (ageGroup === 'above80') {
      if (income <= 500000) tax = 0;
      else if (income <= 1000000) tax = (income - 500000) * 0.2;
      else tax = 100000 + (income - 1000000) * 0.3;
    }
    return tax;
  }

  private calculateNewRegimeTax(income: number): number {
    let tax = 0;
    if (income <= 300000) tax = 0;
    else if (income <= 600000) tax = (income - 300000) * 0.05;
    else if (income <= 900000) tax = 15000 + (income - 600000) * 0.1;
    else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
    else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.20;
    else tax = 150000 + (income - 1500000) * 0.3;
    if(income <= 700000){tax = 0;}
    
    return tax;
  }
}
