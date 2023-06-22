import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  listQuestion: any[] = [];

  constructor() {}

  handleAddQuestion(question: any) {
    this.listQuestion.push(question);
  }
}
