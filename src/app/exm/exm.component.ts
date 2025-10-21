import { Component } from '@angular/core';
import { Stats } from '../Interface.s';
import { Query } from '../Interfaces/Interface.q';
import { QserviceService } from '../qservice.service';
import { StatsService } from '../stats.service';

@Component({
    selector: 'bm-exm',
    templateUrl: './exm.component.html',
    styleUrls: ['./exm.component.css'],
    standalone: false
})
export class ExmComponent {
  questions: Query[] = []

  qcor = false;
  zeigAktuelleAntwort = -1

  frage: Query;
  aktuelleFrageNummer = -1

  stats: Stats;
  richtigeEingabe = false //boolean:
  gotolearnmode: boolean
  learnwrong: number
  maxlearnwrong = 2

  constructor(
    private qservice: QserviceService,
    private stat: StatsService
  ) {
    this.questions = this.qservice.getAllQ()
    this.qservice.initGibAntw()

    this.aktuelleFrageNummer = 0
    this.frage = this.questions[this.aktuelleFrageNummer]

    this.stats = this.stat.berStatAll()
    this.gotolearnmode = false
    this.learnwrong = 0
  }
  kInput(myinput: string) {
    this.richtigeEingabe = false
    this.frage.qgiventxt = myinput
    if (this.frage.qanswers.find(
      a => a.txt.find(
        t => t === this.frage.qgiventxt
      ))) {
      this.richtigeEingabe = true
    }
    this.refreshStatsFI()
  }
  vorherigeFrage() {
    if (0 < this.aktuelleFrageNummer) {
      this.aktuelleFrageNummer--
      this.frage = this.questions[this.aktuelleFrageNummer]
    }
    this.qcor = false
    this.refreshStatsSC()
  }
  naechsteFrage() {
    if (this.frage.qtyp === 'sc') {
      if (this.CheckSinChFrageAnt()) {
        this.gotolearnmode = false
        if (!this.CheckSinChFrageRichtig()) {
          this.learnwrong++
          //this.refreshStats()
          if ((100 * (this.learnwrong / this.questions.length)) > this.maxlearnwrong) {
            this.gotolearnmode = true
          }
        } else {
          //this.refreshStats()
        }
      } else {
        //this.refreshStats()
      }
      this.setzNFrage()
    } else if (this.frage.qtyp === 'mc') {
      if (this.CheckMulChFrageAnt()) {
        this.gotolearnmode = false
        if (!this.CheckMulChFrageRichtig()) {
          this.learnwrong++
          //this.refreshStats()
          if ((100 * (this.learnwrong / this.questions.length)) > this.maxlearnwrong) {
            this.gotolearnmode = true
          }
        } else {
          //this.refreshStats()
        }
      } else {
        //this.refreshStats()
      }
      this.setzNFrage()
    } else if (this.frage.qtyp === 'fi') {
      if (this.CheckFiFrageAnt()) {
        this.gotolearnmode = false
        if (!this.CheckFiFrageRichtig()) {
          this.learnwrong++
          //this.refreshStats()
          if ((100 * (this.learnwrong / this.questions.length)) > this.maxlearnwrong) {
            this.gotolearnmode = true
          }
        } else {
          //this.refreshStats()
        }
      } else {
        //this.refreshStats()
      }
      this.setzNFrage()
    }
  }
  setzNFrage() {
    if (this.aktuelleFrageNummer < this.questions.length - 1) {
      this.aktuelleFrageNummer++
      this.frage = this.questions[this.aktuelleFrageNummer]
    }
    this.qcor = false
    //this.refreshStats()
  }
  //Fill in
  CheckFiFrageAnt() {
    if (this.frage.qgiventxt != '') {
      return true
    }
    else {
      return false
    }
  }
  CheckFiFrageRichtig() {
    if (this.frage.qanswers.find(a => a.givenans !== a.correct)) {
      return false
    }
    else {
      return true
    }
  }
  refreshStatsFI() {
    this.stats = this.stat.berStatAll()
  }

  //Multiple Choice
  aGebAntwortMC(ok: number) {
    this.frage.qanswers[ok].givenans = !this.frage.qanswers[ok].givenans
    this.refreshStats()
  }
  CheckMulChFrageAnt() {
    if (this.frage.qanswers.find(a => a.givenans === true)) {
      return true
    }
    else {
      return false
    }
  }
  CheckMulChFrageRichtig() {
    if (this.frage.qanswers.find(a => a.givenans !== a.correct)) {
      return false
    }
    else {
      return true
    }
  }
  refreshStats() {
    this.stats = this.stat.berStatAll()
  }

  //single choice
  aGebAntwortSC(ok: number) {
    this.frage.qanswers.map(an => an.givenans = false)
    this.frage.qanswers[ok].givenans = !this.frage.qanswers[ok].givenans
    this.refreshStatsSC()
  }
  CheckSinChFrageAnt() {
    if (this.frage.qanswers.find(a => a.givenans === true)) {
      return true
    }
    else {
      return false
    }
  }
  CheckSinChFrageRichtig() {
    if (this.frage.qanswers.find(a => a.givenans !== a.correct)) {
      return false
    }
    else {
      return true
    }
  }
  refreshStatsSC() {
    this.stats = this.stat.berStatAll()
  }
}
