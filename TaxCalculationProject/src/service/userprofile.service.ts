import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  _http:HttpClient;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

  constructor(_httpRef:HttpClient, private router:Router,private authService: AuthService) {
    this._http=_httpRef;
   }

   usersdata:any;
   getDetails()
  {
  this._http.get("https://localhost:7283/api/UserDatums/"+this.authService.userid)
  .subscribe((data=>{
    this.usersdata=data;
    console.log(this.usersdata.userName);
  }));
  }

  cadata:any;
  getcaDetails()
  {
  this._http.get("https://localhost:7283/api/CharteredAccountants/"+this.authService.caid)
  .subscribe((data=>{
    this.cadata=data;
    console.log(this.cadata.userName);
  }));
  }


  userDetails:any;

  getTaxHistory(){
    this._http.get("https://localhost:7283/api/TableInfoes/userdetails/"+this.authService.userid)
   .subscribe((data=>{
     this.userDetails=data;
    //  this.DetailsUserName = details.userName;
    //  this.userDetails[0].userName = details.userName;
    //  this.userDetails[0].gender = details.gender;
    //  this.userDetails[0].email = details.email;
    //  this.userDetails[0].userAddress = details.userAddress;
    //  console.log(this.userDetails[0].oldRegimeTax);
    //  this.router.navigateByUrl("displayuserdetails");
   }))

  }


public update:boolean = false;
updateUserDetails(data:any)
{
  data.value.caId = this.authService.caid;
  data.value.userId = this.authService.userid;
console.log(data.value);
this._http.put('https://localhost:7283/api/UserDatums/' + this.authService.userid,JSON.stringify(data.value),this.httpOptions)
.subscribe(result =>{
  alert("Updated Successfully!");
  this.update = false;
  console.log(result)
})

}


}
