import { Component } from '@angular/core';
import { Stats } from 'src/app/Interface.s';
import { Query } from 'src/app/Interfaces/Interface.q';

import { QserviceService } from 'src/app/qservice.service';
import { StatsService } from 'src/app/stats.service';

@Component({
  selector: 'bm-fift-check',
  templateUrl: './fift-check.component.html',
  styleUrls: ['./fift-check.component.css']
})
export class FiftCheckComponent {
  questions: Query[] = []

  qcor = false;
  zeigAktuelleAntwort = -1

  frage: Query;
  aktuelleFrageNummer = -1

  stats: Stats;
  richtigeEingabe = false //boolean:
  gotolearnmode: boolean
  learnwrong: number
  maxlearnwrong = 3

  constructor(
    private qservice: QserviceService,
    private stat: StatsService
  ) {
    this.questions = this.qservice.getFiQ()
    this.qservice.initGibAntw()

    this.aktuelleFrageNummer = 0
    this.frage = this.questions[this.aktuelleFrageNummer]
    
    this.stats = this.stat.berStatFi()
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
    this.refreshStatsFI()
  }
  naechsteFrage() {
    if (this.CheckFiFrageAnt()) {
      this.gotolearnmode = false
      if (!this.CheckFiFrageRichtig()) {
        this.learnwrong++
        this.frage.qgiventxt = ''
        this.vorherigeFrage()
        this.refreshStatsFI()
        if (this.learnwrong >= this.maxlearnwrong) {
          this.gotolearnmode = true
        }
      } else {
        if (this.aktuelleFrageNummer < this.questions.length - 1) {
          this.aktuelleFrageNummer++
          this.frage = this.questions[this.aktuelleFrageNummer]
        }
        this.qcor = false
        this.refreshStatsFI()
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
  korrektheitPruefen(qid: number): void {
    if (this.zeigAktuelleAntwort != qid) {
      this.zeigAktuelleAntwort = qid;
      this.qcor = true
    }
    else {
      this.qcor = !this.qcor
    }
    this.refreshStatsFI()
  }
  aGebAntwortFI(ok: number) {
    this.frage.qanswers.map(a => a.givenans = false)
    this.frage.qanswers[ok].givenans = !this.frage.qanswers[ok].givenans
    this.refreshStatsFI()
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
    this.stats = this.stat.berStatFi()
  }
}
