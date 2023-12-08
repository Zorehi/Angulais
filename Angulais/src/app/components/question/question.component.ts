import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnChanges {
  @ViewChild('true') true!: ElementRef;
  @ViewChild('false') false!: ElementRef;
  @Input('question') question!: {question: string, answer: boolean, how: string}
  @Input('show') show: boolean = false;
  answer: boolean = false;

  constructor() { }

  ngOnChanges() {
    if (this.show) {
      if (this.question.answer == this.answer) {
        if (this.answer) {
          this.true.nativeElement.classList.remove('choose');
          this.true.nativeElement.classList.add('correct');
        } else {
          this.false.nativeElement.classList.remove('choose');
          this.false.nativeElement.classList.add('correct');
        }
      } else {
        if (this.answer) {
          this.true.nativeElement.classList.remove('choose');
          this.true.nativeElement.classList.add('wrong');
          this.false.nativeElement.classList.add('correct');
        } else {
          this.false.nativeElement.classList.remove('choose');
          this.false.nativeElement.classList.add('wrong');
          this.true.nativeElement.classList.add('correct');
        }
      }
    } else {
      this.true.nativeElement.classList.remove('choose');
      this.true.nativeElement.classList.remove('correct');
      this.true.nativeElement.classList.remove('wrong');
      this.false.nativeElement.classList.remove('choose');
      this.false.nativeElement.classList.remove('correct');
      this.false.nativeElement.classList.remove('wrong');
    }
  }

  clickTrue() {
    this.answer = true;
    this.true.nativeElement.classList.add('choose');
    this.false.nativeElement.classList.remove('choose');
  }

  clickFalse() {
    this.answer = false;
    this.false.nativeElement.classList.add('choose');
    this.true.nativeElement.classList.remove('choose');
  }
}
