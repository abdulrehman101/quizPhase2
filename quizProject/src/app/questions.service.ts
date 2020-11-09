import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Questions } from './model.questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  deleteques: Questions[] = []
  constructor(private httpClient:HttpClient) { }

  loadAngularQuestions():Observable<Questions[]>{
    return this.httpClient.get<Questions[]>("http://localhost:3000/Angular")
  }

  loadJavaScriptQuestions():Observable<Questions[]>{
    return this.httpClient.get<Questions[]>("http://localhost:3000/JavaScript")
  }

  loadTypeScriptQuestions():Observable<Questions[]>{
    return this.httpClient.get<Questions[]>("http://localhost:3000/TypeScript")
  }
}
