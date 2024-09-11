import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.userName.trim()) {
      // Store the user name in localStorage
      localStorage.setItem('userName', this.userName);
      // Navigate to the home page
      this.router.navigate(['/home']);
    }
  }
}
