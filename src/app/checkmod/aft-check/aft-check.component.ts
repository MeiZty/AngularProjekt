import { Component } from '@angular/core';
import { Stats } from 'src/app/Interface.s';
import { Query } from 'src/app/Interfaces/Interface.q';
import { QserviceService } from 'src/app/qservice.service';
import { StatsService } from 'src/app/stats.service';

@Component({
    selector: 'bm-aft-check',
    templateUrl: './aft-check.component.html',
    styleUrls: ['./aft-check.component.css'],
    standalone: false
})
export class AftCheckComponent {
  questions: Query[] = []

  qcor = false;
  zeigAktuelleAntwort = -1

  frage: Query;
  aktuelleFrageNummer = -1

  stats: Stats;
  richtigeEingabe = false
  gotolearnmode: boolean
  learnwrong: number
  maxlearnwrong = 7

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
          if (this.learnwrong >= this.maxlearnwrong) {
            this.gotolearnmode = true
          }
          if (this.aktuelleFrageNummer < this.questions.length - 1) {
            this.aktuelleFrageNummer++
            this.frage = this.questions[this.aktuelleFrageNummer]
          }
          this.qcor = false
        } else {
          this.learnwrong++
          if (this.aktuelleFrageNummer < this.questions.length - 1) {
            this.aktuelleFrageNummer++
            this.frage = this.questions[this.aktuelleFrageNummer]
          }
          this.qcor = false
        }
      } else {
        if (this.aktuelleFrageNummer < this.questions.length - 1) {
          this.aktuelleFrageNummer++
          this.frage = this.questions[this.aktuelleFrageNummer]
        }
        this.qcor = false
        this.refreshStatsSC()
      }
    } else if (this.frage.qtyp === 'mc') {
      if (this.CheckMulChFrageAnt()) {
        this.gotolearnmode = false
        if (!this.CheckMulChFrageRichtig()) {
          this.learnwrong++
          if (this.learnwrong >= this.maxlearnwrong) {
            this.gotolearnmode = true
          }
          if (this.aktuelleFrageNummer < this.questions.length - 1) {
            this.aktuelleFrageNummer++
            this.frage = this.questions[this.aktuelleFrageNummer]
          }
          this.qcor = false
          this.refreshStats()
        } else {
          this.learnwrong++
          if (this.aktuelleFrageNummer < this.questions.length - 1) {
            this.aktuelleFrageNummer++
            this.frage = this.questions[this.aktuelleFrageNummer]
          }
          this.qcor = false
          this.refreshStats()
        }
      } else {
        if (this.aktuelleFrageNummer < this.questions.length - 1) {
          this.aktuelleFrageNummer++
          this.frage = this.questions[this.aktuelleFrageNummer]
        }
        this.qcor = false
        this.refreshStats()
      }
    } else if (this.frage.qtyp === 'fi') {
      if (this.CheckFiFrageAnt()) {
        this.gotolearnmode = false
        if (!this.CheckFiFrageRichtig()) {
          this.learnwrong++
          if (this.learnwrong >= this.maxlearnwrong) {
            this.gotolearnmode = true
          }
          if (this.aktuelleFrageNummer < this.questions.length - 1) {
            this.aktuelleFrageNummer++
            this.frage = this.questions[this.aktuelleFrageNummer]
          }
        } else {
          if (this.aktuelleFrageNummer < this.questions.length - 1) {
            this.aktuelleFrageNummer++
            this.frage = this.questions[this.aktuelleFrageNummer]
          }
          this.qcor = false
        }
      } else {
        if (this.aktuelleFrageNummer < this.questions.length - 1) {
          this.aktuelleFrageNummer++
          this.frage = this.questions[this.aktuelleFrageNummer]
        }
        this.qcor = false
        this.refreshStatsFI()
      }
    }
  }

  korrektheitPruefen(qid: number): void {
    if (this.zeigAktuelleAntwort != qid) {
      this.zeigAktuelleAntwort = qid;
      this.qcor = true
    }
    else {
      this.qcor = !this.qcor
    }
    this.refreshStatsSC()
  }

  CheckFiFrageAnt() {
    if (this.frage.qgiventxt != '') {
      return true
    }
    else {
      return false
    }
  }

  CheckFiFrageRichtig() {
    if (this.frage.qanswers.find(q => q.txt.find(a => a === this.frage.qgiventxt))) {
      return true
    }
    else {
      return false
    }
  }

  refreshStatsFI() {
    this.stats = this.stat.berStatAll()
  }

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
    if (this.frage.qanswers.find(a => a.givenans != a.correct)) {
      return false
    }
    else {
      return true
    }
  }
  refreshStats() {
    this.stats = this.stat.berStatAll()
  }

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
    if (this.frage.qanswers.find(a => a.givenans === true && a.givenans === a.correct)) {
      return true
    }
    else {
      return false
    }
  }

  refreshStatsSC() {
    this.stats = this.stat.berStatAll()
  }
}