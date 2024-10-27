import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private route : Router){}
  createNew(){
    console.log('creating new component');
    this.route.navigate(['/taxcalculator']);
  }

  openResources() {
    window.open('https://www.incometax.gov.in/iec/foportal/', '_blank'); // Replace with your URL
  }
}
