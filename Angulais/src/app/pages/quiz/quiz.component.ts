import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  @ViewChild('button') button!: ElementRef;
  answer: boolean = false;
  index: number = 0;

  constructor(public quiz: QuizService) { }

  clickButton() {
    if (this.button.nativeElement.textContent == 'Confirmer') {
      this.answer = true;
      this.button.nativeElement.textContent = 'Continuer';
    } else {
      this.answer = false;
      this.button.nativeElement.textContent = 'Confirmer';
      this.index++;
    }
  }
}
