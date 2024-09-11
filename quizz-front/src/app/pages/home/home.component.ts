import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser: { name: string; quizzesTaken: number };

  constructor(private router: Router, private renderer: Renderer2) {
    // TODO: Fetch featured quizzes from a service
    // TODO: Get current user from an authentication service
    this.currentUser = {
      name: localStorage.getItem('userName') || 'username',
      quizzesTaken: Number(localStorage.getItem('quizzesTaken')) || 0
    };
  }


  startNewQuiz() {
    // Navigate to the quiz component
    this.router.navigate(['/quiz']);
  }

  viewPastResults() {
    // Navigate to the results component
    this.router.navigate(['/results']);
  }

  editProfile() {
    // TODO: Implement logic to edit user profile
    console.log('Editing profile');
    this.router.navigate(['/login']);
  }
}
