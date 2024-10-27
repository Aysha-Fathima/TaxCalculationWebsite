import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _http : HttpClient;
  public authenticated = 'user type';
  private token = 'token';
  isCA : boolean = localStorage.getItem(this.token)=='CA';
  isuser : boolean = localStorage.getItem(this.token)=='user';
  public userid:any;
  public caid:any;

  constructor(a:HttpClient,private router:Router){this._http = a;}


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    redirecttouserdashboard(){
      this.router.navigateByUrl("dashboard");
    }
    redirecttocadashboard(){
      this.router.navigateByUrl("cadashboard");
    }

  login(loginInfo:any)
  {

    console.log(loginInfo.value);
    if(loginInfo.value.usertype == 'user'){
     
    this._http.get("https://localhost:7283/api/UserDatums/getIdByEmail?email=" + loginInfo.value.email)
    .subscribe(((data:any)=>{
      this.userid=data.userId;
      this.caid=data.caId;
      console.log("user",this.userid);
      console.log("ca",this.caid);
    }));
    
    // console.log(loginInfo.value.userRole);
    this._http.post("https://localhost:7283/api/UserDatums/Login",loginInfo.value,this.httpOptions).pipe(
      tap(response => {
        // Handle success response
        console.log("Success", response);
        // alert("Login Successful");
        this.isuser = true;
        this.redirecttouserdashboard();
        
        // this.router.navigate(['/dashboard']);
        //this.router.navigate(['/home']);
        // this.router.navigate(['/your-target-component']); // Replace with your target route
      }),
      catchError(error => {
        // Handle error response
        console.error("Error", error);
        alert(error.error || "Login failed. Please try again.");
        return throwError(() => new Error('test')); // Rethrow the error for further handling if needed
      })
    ).subscribe(); // Subscribe at the end to trigger the request
  }

  else{

    this._http.get("https://localhost:7283/api/CharteredAccountants/getIdByEmail?email=" + loginInfo.value.email)
    .subscribe(((data:any)=>{
      console.log(data);
      this.caid=data;
      // console.log(this.userid);
      console.log(this.caid);
    }));

     this._http.post("https://localhost:7283/api/CharteredAccountants/Login",loginInfo.value,this.httpOptions).pipe(
      tap(response => {
        // Handle success response
        console.log("Success", response);
        // alert("Login Successful");
        this.isCA = true;
        this.redirecttocadashboard();
        
        // this.router.navigate(['/cadashboard']);
        //this.router.navigate(['/home']);
        // this.router.navigate(['/your-target-component']); // Replace with your target route
      }),
      catchError(error => {
        // Handle error response
        console.error("Error", error);
        alert(error.error || "Login failed. Please try again.");
        return throwError(() => new Error('test')); // Rethrow the error for further handling if needed
      })
    ).subscribe(); // Subscribe at the end to trigger the request
  }
}


  // login(formData: any){
  //   if(formData.value.usertype == 'user'){
  //     const payload = {email: formData.value.email,password: formData.value.password};
  //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //     this._http.post("https://localhost:7283/api/UserDatums/Login", payload, { headers })
  //         .subscribe((data: any) => {
  //           console.log(data);
  //           console.log(data.token);
  //             if (data && data.token) {
  //                 localStorage.setItem(this.token, data.token);
  //                 localStorage.setItem(this.authenticated, 'user');
  //                this.router.navigate(['/dashboard']);
  //                this.isuser = true;
  //             } else {
  //                 console.error('Login failed: Invalid credentials');
  //                 alert('Login failed: Invalid credentials');
  //             }
  //         }, (error) => {
  //             console.error('Login failed:', error);
  //             alert('An error occurred while logging in. Please try again.');
  //         });
  //       }
  //   else if(formData.value.usertype == 'CA'){
  //     localStorage.setItem(this.authenticated, 'CA');
  //     this.router.navigate(['/cadashboard']);
  //     console.log(formData.value);
  //     this.isCA = true;
  //   }
  // }

  logout(): void{
    this.router.navigate(['']);
    localStorage.clear();
    this.isCA = false;
    this.isuser = false;
  }

  getstarted(){
    if(localStorage.getItem(this.authenticated) == 'CA'){
      this.router.navigate(['/cadashboard']);
    }
    else if(localStorage.getItem(this.authenticated) == 'user'){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/register']);
    }
  }
}
