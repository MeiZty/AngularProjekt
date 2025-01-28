import { Injectable } from '@angular/core';
import { Query } from './Interfaces/Interface.q';
import Single_Choice_Set from '../assets/LPI-2019-1-101d-QA-sc.json';
import Multiple_Choice_Set from '../assets/LPI-2019-1-101d-QA-mc.json';
import Fill_in_Set from '../assets/LPI-2019-1-101d-QA-fi.json';
import All_Set from '../assets/LPI-2019-1-101d-QA-all.json';

@Injectable({
  providedIn: 'root'
})
export class QserviceService {
  questionsSC: Query[] = Single_Choice_Set
  questionsMC: Query[] = Multiple_Choice_Set
  questionsFi: Query[] = Fill_in_Set
  questionsAll: Query[] = All_Set

  initGibAntw() {
    this.questionsMC.map(f => f.qanswers.map(a => a.givenans = false))
    this.questionsSC.map(f => f.qanswers.map(a => a.givenans = false))
    this.questionsFi.map(f => f.qanswers.map(a => a.givenans = false))
    this.questionsFi.map(f=> f.qgiventxt='')
    this.questionsAll.map(f => f.qanswers.map(a=> a.givenans = false))
    this.questionsAll.map(q=>q.qgiventxt='')
  }


  getAllQ() {
    return this.questionsAll;
  }
  getSCQ() {
    return this.questionsSC;
  }
  getMCQ() {
    return this.questionsMC;
  }
  getFiQ() {
    return this.questionsFi;
  }
}