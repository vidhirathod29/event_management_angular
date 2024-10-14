import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  
})
export class DashboardComponent {
  constructor(private readonly router: Router) {}

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
