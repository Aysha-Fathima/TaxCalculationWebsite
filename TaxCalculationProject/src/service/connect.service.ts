import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {AuthService}  from './auth.service';
import jsPDF from 'jspdf';
import { D } from '@angular/cdk/keycodes';
import { UserprofileService } from './userprofile.service';


@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  // constructor(private _http:HttpClient) {}

  _http:HttpClient;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

  constructor(_httpRef:HttpClient, private router:Router,private authService: AuthService,private userprofileService:UserprofileService) {
    this._http=_httpRef;
   }



  // register(form: any) {
  //   console.log("connect service is printing");
  //   console.log(form.value);


  // }
  redirecttologin(){
    this.router.navigateByUrl("login");
  }

  register(registerInfo:any)
  {
    // registerInfo.value.userRole = "Customer";
    console.log(registerInfo.value);
   return this._http.post("https://taxcalculationprojectfinal20241028122026.azurewebsites.net/api/UserDatums",registerInfo.value,this.httpOptions).pipe(
      tap(response => {
        // Handle success response
        console.log("Success", response);
        alert("Registration Successful");
        this.redirecttologin();
        // this.router.navigate(['/your-target-component']); // Replace with your target route
      }),
      catchError(error => {
        // Handle error response
        console.error("Error", error);
        alert(error.error || "Register failed. Please try again.");
        return throwError(() => new Error('test')); // Rethrow the error for further handling if needed
      })
    ).subscribe(); // Subscribe at the end to trigger the request
  }



  //Login
  redirecttohome(){
    this.router.navigateByUrl("home");
  }

  
  userId:any;
  // login(loginInfo:any)
  // {

  //   console.log(loginInfo.value);

    // this._http.get("https://localhost:7068/api/TaxiRideBookings/userName?name=" + loginInfo.value.userName)
    // .subscribe((data=>{
    //   this.userId=data;
    //   console.log(this.userId);
    // }))
    
    // console.log(loginInfo.value.userRole);
  //  return this._http.post("https://localhost:7068/api/Users/Login",loginInfo.value,this.httpOptions).pipe(
  //     tap(response => {
  //       // Handle success response
  //       console.log("Success", response);
  //       // alert("Login Successful");
  //       this.redirecttohome();
  //       //this.router.navigate(['/home']);
  //       // this.router.navigate(['/your-target-component']); // Replace with your target route
  //     }),
  //     catchError(error => {
  //       // Handle error response
  //       console.error("Error", error);
  //       alert(error.error || "Login failed. Please try again.");
  //       return throwError(() => new Error('test')); // Rethrow the error for further handling if needed
  //     })
  //   ).subscribe(); // Subscribe at the end to trigger the request
  // }



  public showGrossTotalIncome:boolean = false;


  userTaxDetails:any;
  saveTaxCalculations(data:any){
    console.log(this.authService.userid);
    console.log(this.authService.caid);
    data.userId =  this.authService.userid;
    data.caid = this.authService.caid;
    console.log(data);
    this.userTaxDetails = data;
    console.log(this.userTaxDetails);
    this._http.post("https://taxcalculationprojectfinal20241028122026.azurewebsites.net/api/TableInfoes",data) // where and what data
      .subscribe(response=>{
        this.showGrossTotalIncome = true;
        console.log("data added:", response)
        // alert("added")
      });
    // this._http.post("",JSON.stringify(data));
  }


  generatePDF() {
    const pdf = new jsPDF();
    console.log(this.userprofileService.usersdata);

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
    pdf.text(`Name: ${this.userprofileService.usersdata.userName}`, 20, 30);
    pdf.text(`Email: ${this.userprofileService.usersdata.email}`, 20, 40);
    pdf.text(`Gender: ${this.userprofileService.usersdata.gender}`, 20, 50);
    pdf.text(`Address: ${this.userprofileService.usersdata.userAddress}`, 20, 60);
    
    pdf.line(20, 65, pageWidth - 20, 65);
  
    // Tax Details
    pdf.text(`Assessment Year: ${this.userTaxDetails.assessmentYear}`, 20, 75);
    pdf.text(`Age Group: ${this.userTaxDetails.age}`, 20, 85);
    pdf.text(`Total Annual Income: ${this.userTaxDetails.totalAnnualIncome}`, 20, 95);
    pdf.text(`Deductions: ${this.userTaxDetails.totalDeductions}`, 20, 105);
    
    pdf.line(20, 110, pageWidth - 20, 110);
    
    // Analysis Section
    pdf.setFontSize(16);
    const analysisTitle = 'Analysis';
    const analysisTitleWidth = pdf.getTextWidth(analysisTitle);
    const analysisTitleX = (pageWidth - analysisTitleWidth) / 2;
    pdf.text(analysisTitle, analysisTitleX, 120);
    
    pdf.setFontSize(12);
    pdf.text(`You pay ${this.userTaxDetails.oldRegimeTax} tax in new Regime`, 20, 130);
    pdf.text(`You pay ${this.userTaxDetails.newRegimeTax} tax in old Regime`, 20, 140);
    
    // Chart
    const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (chartCanvas) {
      const chartImage = chartCanvas.toDataURL('image/png');
      pdf.addImage(chartImage, 'PNG', 20, 150, 170, 100); // Adjust Y to fit with text
    } else {
      console.warn("Chart canvas not found!");
    }

    const minTax = Math.min(this.userTaxDetails.oldRegimeTax, this.userTaxDetails.newRegimeTax);
    const savings = Math.abs(this.userTaxDetails.oldRegimeTax - this.userTaxDetails.newRegimeTax);
    // pdf.setFontSize(14);
    // pdf.text('Recommendation', titleX, 280);
    pdf.setFontSize(12);
    // pdf.text(`You will save ${savings} if you choose the regime with the lower tax of ${minTax}.`, 20, 280);

    const recommendationText = `You will save ${savings} if you choose the regime with the lower tax of ${minTax}.`;

// Set maximum width for text wrapping
const maxWidth = pageWidth - margin * 2; // Considering margins
const wrappedText = pdf.splitTextToSize(recommendationText, maxWidth);

// Calculate Y position for the wrapped text
let textY = 270; // Starting position for the recommendation text

// Adjust Y position if the wrapped text extends beyond the page limits
for (let i = 0; i < wrappedText.length; i++) {
  pdf.text(wrappedText[i], 15, textY);
  textY += 10; // Increment Y position for each line (adjust line height as needed)
}
  
    // Finalize and open the PDF
    const pdfData = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfData);
    window.open(pdfUrl, '_blank');
  }
  

  // generatePDF(){
  //   // console.log("hii",this.userTaxDetails);
  //   const pdf = new jsPDF();

  //   pdf.setFontSize(16);
  //   pdf.text('Tax Details', 20, 20);
  //   pdf.setFontSize(12);

  //   pdf.text(`assessmentYear: ${this.userTaxDetails.assessmentYear}`, 20, 30);
  //   pdf.text(`totalDeduction: ${this.userTaxDetails.caId}`, 20, 40);
  //   pdf.text(`totalDeduction: ${this.userTaxDetails.totalDeductions}`, 20, 50);
  //   pdf.text(`advanceTaxPaid: ${this.userTaxDetails.age}`, 20, 60);
  //   pdf.text(`grossTotalIncome: ${this.userTaxDetails.totalAnnualIncome}`, 20, 70);
  //   pdf.text(`netOldRegimeTax: ${this.userTaxDetails.oldRegimeTax}`, 20, 80);
  //   pdf.text(`netNewRegimeTax: ${this.userTaxDetails.newRegimeTax}`, 20, 90);


  //   const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement;

  // if (chartCanvas) {
  //   // Convert canvas to data URL
  //   const chartImage = chartCanvas.toDataURL('image/png');

  //   // Add image to PDF
  //   pdf.addImage(chartImage, 'PNG', 20, 100, 170, 100); // Adjust dimensions as needed
  // } else {
  //   console.warn("Chart canvas not found!");
  // }

  //   const pdfData = pdf.output('blob');
  //   const pdfUrl = URL.createObjectURL(pdfData);
  //   window.open(pdfUrl, '_blank');

  //   // pdf.save('student-info.pdf');
  //  }

  
  public allusers:any;
   getAllUsers()
 {
   this._http.get("https://taxcalculationprojectfinal20241028122026.azurewebsites.net/api/UserDatums/UsersForCA/"+this.authService.caid)
   .subscribe((data=>{
     this.allusers=data;
     console.log(this.allusers);
   }))
 }

 
 userDetails:any;
 public DetailsUserName:any;
 viewDetails(details:any)
 {
   console.log("Details",details);
   this._http.get("https://taxcalculationprojectfinal20241028122026.azurewebsites.net/api/TableInfoes/userdetails/"+details.userId)
   .subscribe((data=>{
     this.userDetails=data;
    //  this.DetailsUserName = details.userName;
     this.userDetails[0].userName = details.userName;
     this.userDetails[0].gender = details.gender;
     this.userDetails[0].email = details.email;
     this.userDetails[0].userAddress = details.userAddress;
     console.log(this.userDetails[0].oldRegimeTax);
     this.router.navigateByUrl("displayuserdetails");
   }))
 }

}
