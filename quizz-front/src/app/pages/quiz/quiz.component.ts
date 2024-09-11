import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Add HttpClient here
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface QuizResult {
  username: string;
  correctCount: number;
  totalQuizzes: number;
}
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: { [key: number]: string } = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.http.get('https://opentdb.com/api.php?amount=10').subscribe((response: any) => {
      this.questions = response.results.map((question: any) => ({
        ...question,
        question: this.decodeHtml(question.question),
        correct_answer: this.decodeHtml(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map((answer: string) => this.decodeHtml(answer)),
        all_answers: this.shuffleAnswers([
          this.decodeHtml(question.correct_answer),
          ...question.incorrect_answers.map((answer: string) => this.decodeHtml(answer))
        ])
      }));
    });
  }

  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  shuffleAnswers(answers: string[]): string[] {
    return answers.sort(() => Math.random() - 0.5);
  }

  selectAnswer(questionIndex: number, answer: string) {
    this.selectedAnswers[questionIndex] = answer;
  }

  submitQuiz() {
    if (Object.keys(this.selectedAnswers).length < this.questions.length) {
      if (!confirm('Not all questions are answered. Do you still want to submit?')) {
        return;
      }
    }

    let correctCount = 0;
    const userResults = this.questions.map((question, index) => {
      const isCorrect = this.selectedAnswers[index] === question.correct_answer;
      if (isCorrect) {
        correctCount++;
      }
      return {
        question: question.question,
        selectedAnswer: this.selectedAnswers[index],
        correctAnswer: question.correct_answer,
        isCorrect: isCorrect
      };
    });

    const storedUserResults = JSON.parse(localStorage.getItem('userResults') || '[]');
    storedUserResults.push(userResults);
    localStorage.setItem('userResults', JSON.stringify(storedUserResults));

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const username = localStorage.getItem('userName') || 'username';
    const user = { username, correctCount, totalQuizzes: 1 };
    const existingUser = leaderboard.find((u: any) => u.username === user.username);
    if (existingUser) {
      existingUser.totalQuizzes++;
      existingUser.correctCount += correctCount;
    } else {
      leaderboard.push(user);
    }
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    alert(`You got ${correctCount} out of ${this.questions.length} correct!`);
    this.router.navigate(['/home']);
  }
}
