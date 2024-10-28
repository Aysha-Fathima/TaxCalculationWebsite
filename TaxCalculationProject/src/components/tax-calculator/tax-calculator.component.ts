import { AfterViewInit, Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ConnectService } from '../../service/connect.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Chart, registerables } from 'chart.js';

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

export class TaxCalculatorComponent{
  restUserData: ConnectService;
  constructor( restUserDataRef:ConnectService,private router:Router)
  {
    this.restUserData=restUserDataRef;

  }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

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


  // ngOnChanges(changes: SimpleChanges) {
  //   // Check if showGrossTotalIncome has changed
  //   if (changes.restUserData?.showGrossTotalIncome?.currentValue) {
  //     this.chartVisualise();
  //   }
  // }

  chart: any;
  chartLabel:string[] = [];
  chartData:number[] = [];
  visualise:boolean = false;

  // @ViewChild('myChart', { static: false }) myChart!: ElementRef<HTMLCanvasElement>;

  // ngAfterViewInit() {
  //   // This will be called after the view has been initialized
  // }
  chartVisualise(){
    this.visualise = true;
    // let {detail1,detail2} = this.restUserData.getChartDetails();
      // console.log(detail1,detail2);
      // this.chartLabel = [detail1.assessmentYear,detail2.assessmentYear];
      // this.chartData = [detail1.grossTotalIncome,detail2.grossTotalIncome];
      this.chartLabel = ['NewRegime', 'OldRegime'];
      this.chartData = [this.newRegimeTax,this.oldRegimeTax];
      console.log(this.chartLabel);
      console.log(this.chartData);
      // Register the Chart.js components
      Chart.register(...registerables);
    this.chart = new Chart('myChart', {
      type: 'bar', // Change this to 'line', 'pie', etc. for different chart types
      data: {
        labels: this.chartLabel,
        datasets: [{
          label: 'Income Tax ',
          data: this.chartData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // onCompareClick() {
  //   this.visualise = true;
  //   this.chartVisualise();
  // }
}
