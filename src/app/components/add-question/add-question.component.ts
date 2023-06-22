import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from 'src/app/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  form = this.fb.group({
    question: [''],
    typeOfAnswer: ['paragraph'],
    isRequired: [false],
    allowOthers: [false],
    anotherQuestionArr: this.fb.array([]),
  });
  listAddQuestion!: FormArray;
  listCheckboxes: any[] = [];

  formQuestion: any;

  constructor(
    private readonly ngModalService: NgbModal,
    private readonly fb: FormBuilder,
    readonly questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.listAddQuestion = this.form.get('anotherQuestionArr') as FormArray;
  }

  handleShowModalAddQuestion(content: any) {
    this.ngModalService.open(content);
  }

  handleAddQuestion() {
    this.listAddQuestion.push(
      this.fb.group({
        anotherQuestion: ['', Validators.required],
      })
    );
  }

  changeForm(): void {
    this.listAddQuestion = this.fb.array([
      this.fb.group({
        anotherQuestion: ['', Validators.required],
      }),
    ]);
  }

  handleClickSubmit(modal: any) {
    if (this.form.valid) {
      modal.close('close modal');
      this.questionService.handleAddQuestion(this.form.value);
      debugger;
      const listCheckboxes = this.form.value ?? [];
      this.form.value ?? [];
      this.formQuestion = this.fb.group({
        answerByParagraph: [''],
        answerByCheckbox: this.fb.array([
          // listCheckboxes.map(x => listCheckboxes.indexOf(x) > -1)
        ]),
      });
    }
  }
}
