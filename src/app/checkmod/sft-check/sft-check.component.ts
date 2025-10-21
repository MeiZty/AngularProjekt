import { Component } from '@angular/core';
import { Stats } from 'src/app/Interface.s';
import { Query } from 'src/app/Interfaces/Interface.q';
import { QserviceService } from 'src/app/qservice.service';
import { StatsService } from 'src/app/stats.service';

@Component({
    selector: 'bm-sft-check',
    templateUrl: './sft-check.component.html',
    styleUrls: ['./sft-check.component.css'],
    standalone: false
})
export class SftCheckComponent {
  questions: Query[] = []
  qcor = false;
  zeigAktuelleAntwort = -1
  frage: Query;
  aktuelleFrageNummer = -1
  stats: Stats;
  gotolearnmode: boolean
  learnwrong: number
  maxlearnwrong = 7

  constructor(
    private qservice: QserviceService,
    private stat: StatsService
  ) {
    this.questions = this.qservice.getSCQ()
    this.qservice.initGibAntw()

    this.aktuelleFrageNummer = 0
    this.frage = this.questions[this.aktuelleFrageNummer]

    this.stats = this.stat.berStatSC()
    this.gotolearnmode = false
    this.learnwrong = 0
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
    this.stats = this.stat.berStatSC()
  }
}