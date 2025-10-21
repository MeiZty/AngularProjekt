import { Component } from '@angular/core';
import { QserviceService } from '../../qservice.service';
import { Query } from '../../Interfaces/Interface.q';
import { StatsService } from '../../stats.service';

@Component({
    selector: 'bm-fift',
    templateUrl: './fift.component.html',
    styleUrls: ['./fift.component.css'],
    standalone: false
})
export class FiftComponent {
  questions: Query[] = []

  qcor = false;
  zeigAktuelleAntwort = -1

  frage: Query;
  aktuelleFrageNummer = -1
  
  constructor(
    private qservice: QserviceService,
    private stat: StatsService
  ) {
    this.questions = this.qservice.getFiQ()
    this.qservice.initGibAntw()
    
    this.aktuelleFrageNummer = 0
    this.frage=this.questions[this.aktuelleFrageNummer]
  }
  vorherigeFrage(){
    if (0< this.aktuelleFrageNummer) {
      this.aktuelleFrageNummer--
      this.frage = this.questions[this.aktuelleFrageNummer]
    }
    this.qcor = false
  }
  naechsteFrage(){
    if(this.aktuelleFrageNummer < this.questions.length - 1){
      this.aktuelleFrageNummer++
      this.frage = this.questions[this.aktuelleFrageNummer]
    }
  }
  korrektheitPruefen(qid: number): void{
    if (this.zeigAktuelleAntwort !=qid){
      this.zeigAktuelleAntwort = qid;
      this.qcor = true
    }
    else{
      this.qcor = !this.qcor
    }
  }
}
