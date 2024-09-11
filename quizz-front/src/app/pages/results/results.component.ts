import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  userResults: any[] = [];
  quizDetailsVisible: boolean[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedResults = localStorage.getItem('userResults');
    this.userResults = storedResults ? JSON.parse(storedResults) : [];
    this.quizDetailsVisible = new Array(this.userResults.length).fill(false);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  getCorrectAnswersCount(quiz: any[]): number {
    return quiz.filter(result => result.isCorrect).length;
  }

  toggleQuizDetails(quizIndex: number) {
    this.quizDetailsVisible[quizIndex] = !this.quizDetailsVisible[quizIndex];
  }
}
