import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {AuthService}  from './auth.service';
import jsPDF from 'jspdf';
import { D } from '@angular/cdk/keycodes';


@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  // constructor(private _http:HttpClient) {}

  _http:HttpClient;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

  constructor(_httpRef:HttpClient, private router:Router,private authService: AuthService) {
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
   return this._http.post("https://localhost:7283/api/UserDatums",registerInfo.value,this.httpOptions).pipe(
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
    this._http.post("https://localhost:7283/api/TableInfoes",data) // where and what data
      .subscribe(response=>{
        this.showGrossTotalIncome = true;
        console.log("data added:", response)
        // alert("added")
      });
    // this._http.post("",JSON.stringify(data));
  }

  generatePDF(){
    console.log("hii",this.userTaxDetails);
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text('Tax Details', 20, 20);
    pdf.setFontSize(12);

    pdf.text(`assessmentYear: ${this.userTaxDetails.assessmentYear}`, 20, 30);
    pdf.text(`totalDeduction: ${this.userTaxDetails.caId}`, 20, 40);
    pdf.text(`totalDeduction: ${this.userTaxDetails.totalDeductions}`, 20, 50);
    pdf.text(`advanceTaxPaid: ${this.userTaxDetails.age}`, 20, 60);
    pdf.text(`grossTotalIncome: ${this.userTaxDetails.totalAnnualIncome}`, 20, 70);
    pdf.text(`netOldRegimeTax: ${this.userTaxDetails.oldRegimeTax}`, 20, 80);
    pdf.text(`netNewRegimeTax: ${this.userTaxDetails.newRegimeTax}`, 20, 90);

    const pdfData = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfData);
    window.open(pdfUrl, '_blank');

    // pdf.save('student-info.pdf');
   }

  
   allusers:any;
   getAllUsers()
 {
   this._http.get("https://localhost:7283/api/UserDatums/UsersForCA/"+this.authService.caid)
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
   this._http.get("https://localhost:7283/api/TableInfoes/userdetails/"+details.userId)
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
