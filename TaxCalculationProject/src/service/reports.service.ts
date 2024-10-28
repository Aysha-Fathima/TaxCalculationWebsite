import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ConnectService } from './connect.service';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  _http:HttpClient;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

  constructor(_httpRef:HttpClient, private router:Router,private authService: AuthService,private connectService:ConnectService) {
    this._http=_httpRef;
   }

  
  details:any;
  getAllTaxDetailsAllUsersForCA(){
   this._http.get("https://taxcalculationprojectfinal20241028122026.azurewebsites.net/api/TableInfoes/AllUsersForCA/"+this.authService.caid)
   .subscribe((data=>{
     this.details=data;
    //  this.router.navigateByUrl("displayuserdetails");
   }))
  }

   
   reportTaxDetails:any;
   generateReport(reportDetails:any) {
    console.log(reportDetails);
    this._http.get("https://taxcalculationprojectfinal20241028122026.azurewebsites.net/api/UserDatums/"+reportDetails.userId)
  .subscribe(((data:any)=>{
    // console.log(data.userName);
    this.reportTaxDetails=data;
    // this.reportTaxDetails.value.userName=data.userName;
    // this.reportTaxDetails.value.email=data.email;
    // this.reportTaxDetails.value.gender=data.gender;
    // this.reportTaxDetails.value.userAddress=data.userAddress;
    console.log("hii",this.reportTaxDetails);
  

  //   this._http.get("https://localhost:7283/api/TableInfoes/userdetails/"+reportDetails.userId)
  //  .subscribe((data=>{
  //    this.reportTaxDetails=data;
  //    console.log(this.reportTaxDetails.oldRegimeTax);
  //    this.router.navigateByUrl("displayuserdetails");
  //  }))
    const pdf = new jsPDF();
    console.log(this.connectService.allusers);

    const margin = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

  // Draw border
  pdf.setLineWidth(0.5);
  pdf.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
    
    // Title
    pdf.setFontSize(18);
    const title = 'Detailed Tax Report';
    const titleWidth = pdf.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
  
    pdf.text(title, titleX, 20);
    const lineY = 25; // Y position for the line
    pdf.line(20, lineY, pageWidth - 20, lineY);
  
    // User Info
    pdf.setFontSize(12);
    pdf.text(`Name: ${this.reportTaxDetails.userName}`, 20, 30);
    pdf.text(`Email: ${this.reportTaxDetails.email}`, 20, 40);
    pdf.text(`Gender: ${this.reportTaxDetails.gender}`, 20, 50);
    pdf.text(`Address: ${this.reportTaxDetails.userAddress}`, 20, 60);
    
    pdf.line(20, 65, pageWidth - 20, 65);
  
    // Tax Details
    pdf.text(`Assessment Year: ${reportDetails.assessmentYear}`, 20, 75);
    pdf.text(`Age Group: ${reportDetails.age}`, 20, 85);
    pdf.text(`Total Annual Income: ${reportDetails.totalAnnualIncome}`, 20, 95);
    pdf.text(`Deductions: ${reportDetails.totalDeductions}`, 20, 105);
    
    pdf.line(20, 110, pageWidth - 20, 110);
    
    // Analysis Section
    pdf.setFontSize(16);
    const analysisTitle = 'Analysis';
    const analysisTitleWidth = pdf.getTextWidth(analysisTitle);
    const analysisTitleX = (pageWidth - analysisTitleWidth) / 2;
    pdf.text(analysisTitle, analysisTitleX, 120);
    
    pdf.setFontSize(12);
    pdf.text(`You pay ${reportDetails.oldRegimeTax} tax in new Regime`, 20, 130);
    pdf.text(`You pay ${reportDetails.newRegimeTax} tax in old Regime`, 20, 140);
    
   

     // Bar Graph Data
     const oldRegimeTax = reportDetails.oldRegimeTax;
     const newRegimeTax = reportDetails.newRegimeTax;
     const chartLabels = ['Old Regime', 'New Regime'];
     const chartData = [oldRegimeTax, newRegimeTax];

     // Draw Bar Graph
     const graphHeight = 50; // Height for the graph section
     const graphX = 40;
     const graphY = 160; // Start drawing graph below other content

     // Maximum height of the bars
     const maxTax = Math.max(...chartData);
     const barWidth = 40;

     // Draw scale
     pdf.setFontSize(10);
     for (let i = 0; i <= maxTax; i += Math.ceil(maxTax / 5)) { // Scale intervals
       const yPos = graphY + graphHeight - (i / maxTax) * graphHeight;
       pdf.text(i.toString(), graphX - 10, yPos + 3); // Y position adjusted for text
       pdf.line(graphX - 5, yPos, graphX, yPos); // Scale line
     }

     // Draw bars for Old Regime
     pdf.setFillColor(255, 99, 132); // Color for Old Regime
     const oldBarHeight = (oldRegimeTax / maxTax) * graphHeight;
     pdf.rect(graphX, graphY + graphHeight - oldBarHeight, barWidth, oldBarHeight, 'F');
     pdf.text(chartLabels[0], graphX, graphY + graphHeight + 10);
     pdf.text(oldRegimeTax.toString(), graphX, graphY + graphHeight - oldBarHeight - 5); // Value on bar

     // Draw bars for New Regime
     pdf.setFillColor(54, 162, 235); // Color for New Regime
     const newBarHeight = (newRegimeTax / maxTax) * graphHeight;
     pdf.rect(graphX + 60, graphY + graphHeight - newBarHeight, barWidth, newBarHeight, 'F');
     pdf.text(chartLabels[1], graphX + 60, graphY + graphHeight + 10);
     pdf.text(newRegimeTax.toString(), graphX + 60, graphY + graphHeight - newBarHeight - 5); // Value on bar





    const minTax = Math.min(reportDetails.oldRegimeTax, reportDetails.newRegimeTax);
    const savings = Math.abs(reportDetails.oldRegimeTax - reportDetails.newRegimeTax);
    // pdf.setFontSize(14);
    // pdf.text('Recommendation', titleX, 280);
    pdf.setFontSize(12);
    // pdf.text(`You will save ${savings} if you choose the regime with the lower tax of ${minTax}.`, 20, 280);

    const recommendationText = `You will save ${savings} if you choose the regime with the lower tax of ${minTax}.`;

// Set maximum width for text wrapping
const maxWidth = pageWidth - margin * 2; // Considering margins
const wrappedText = pdf.splitTextToSize(recommendationText, maxWidth);

// Calculate Y position for the wrapped text
let textY = 240; // Starting position for the recommendation text

// Adjust Y position if the wrapped text extends beyond the page limits
for (let i = 0; i < wrappedText.length; i++) {
  pdf.text(wrappedText[i], 15, textY);
  textY += 10; // Increment Y position for each line (adjust line height as needed)
}
  
    // Finalize and open the PDF
    const pdfData = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfData);
    window.open(pdfUrl, '_blank');
  }));
  }

}
