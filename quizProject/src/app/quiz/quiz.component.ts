import { Component, OnInit } from '@angular/core';
import { Questions } from '../model.questions';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  showForm: boolean
  showQuiz: boolean
  quizTopics: string[]
  quizTopic: string = ""
  next_submit: string = "Next"
  
  index: number
  correct: number
  answer: string
  questions: Questions[]

  questionArray: string[] = []
  optionAArray: string[] = []
  optionBArray: string[] = []
  optionCArray: string[] = []
  optionDArray: string[] = []
  answerArray: string[] = []
  quizQuestion: string = ""
  optionA: string = ""
  optionB: string = ""
  optionC: string = ""
  optionD: string = ""

  wrongQuestion: string[] = []
  wrongQuestions: string[][] = []
  rightAnswer: string[] = []
  wrongAnswer: string[] = []

  constructor(private questionService: QuestionsService) {
    this.showForm = true
    this.showQuiz = true
    this.quizTopics = ["JavaScript", "TypeScript"]
    this.quizTopic = ""
    this.questions = []
    this.index = 0
    this.correct = 0
    this.answer = "null"
  }

  ngOnInit(): void {
  }
  correctAnswer():void{
    if (this.answer == this.answerArray[this.index]) {
      this.correct++
    } else {
      this.wrongQuestion.push(this.questionArray[this.index])
      this.rightAnswer.push(this.answerArray[this.index])
      this.wrongAnswer.push(this.answer)
      this.wrongQuestions.push([this.questionArray[this.index],this.answerArray[this.index],this.answer])
    }
    this.answer = ""
  }
  checkForm(quizForm){
    // Change the next button to submit
    if (this.index == 8) {
      this.next_submit = "Submit"
    }
    //  increment index if within limit
    if(this.index < 9){
      this.correctAnswer()
      this.index++
    } else {
      this.correctAnswer()
      this.showQuiz = false
    }
    // console.log(quizForm)
  }
  submit(userForm) {
    this.quizTopic = userForm['value']['quizTopic']
    this.showForm = false
    if (this.quizTopic == "Angular") {
      this.questionService.loadAngularQuestions().subscribe(data => {
        this.questions = data
        for (let x of data) {
          this.questionArray.push(x.question)
          this.optionAArray.push(x.optionA)
          this.optionBArray.push(x.optionB)
          this.optionCArray.push(x.optionC)
          this.optionDArray.push(x.optionD)
          this.answerArray.push(x.answer)
        }
      })
    } else if (this.quizTopic == "TypeScript") {
      this.questionService.loadTypeScriptQuestions().subscribe(data => {
        this.questions = data
        for (let x of data) {
          this.questionArray.push(x.question)
          this.optionAArray.push(x.optionA)
          this.optionBArray.push(x.optionB)
          this.optionCArray.push(x.optionC)
          this.optionDArray.push(x.optionD)
          this.answerArray.push(x.answer)
        }
      })
    } else {
      this.questionService.loadJavaScriptQuestions().subscribe(data => {
        this.questions = data
        for (let x of data) {
          this.questionArray.push(x.question)
          this.optionAArray.push(x.optionA)
          this.optionBArray.push(x.optionB)
          this.optionCArray.push(x.optionC)
          this.optionDArray.push(x.optionD)
          this.answerArray.push(x.answer)
        }
      })
    }
  }
}
