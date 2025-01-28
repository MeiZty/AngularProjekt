import { Component } from '@angular/core';
import { Query } from '../../Interfaces/Interface.q';
import { QserviceService } from '../../qservice.service';
import { StatsService } from '../../stats.service';
@Component({
  selector: 'bm-aft',
  templateUrl: './aft.component.html',
  styleUrls: ['./aft.component.css']
})
export class AftComponent {
  questions: Query[] = []

  qcor = false;
  zeigAktuelleAntwort = -1

  frage: Query;
  aktuelleFrageNummer = -1
  constructor(
    private qservice: QserviceService,
    private stat: StatsService
  ) {
    this.questions = this.qservice.getAllQ()
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
