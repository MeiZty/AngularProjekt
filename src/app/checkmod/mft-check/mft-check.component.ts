import { Component } from '@angular/core';
import { Stats } from 'src/app/Interface.s';
import { Query } from 'src/app/Interfaces/Interface.q';
import { QserviceService } from 'src/app/qservice.service';
import { StatsService } from 'src/app/stats.service';

@Component({
    selector: 'bm-mft-check',
    templateUrl: './mft-check.component.html',
    styleUrls: ['./mft-check.component.css'],
    standalone: false
})
export class MftCheckComponent {
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
    this.questions = this.qservice.getMCQ()
    this.qservice.initGibAntw()

    this.stats = this.stat.berStatMC()

    this.aktuelleFrageNummer = 0
    this.frage = this.questions[this.aktuelleFrageNummer]
    this.gotolearnmode = false
    this.learnwrong = 0
  }

  vorherigeFrage() {
    if (0 < this.aktuelleFrageNummer) {
      this.aktuelleFrageNummer--
      this.frage = this.questions[this.aktuelleFrageNummer]
    }
    this.qcor = false
    this.refreshStats()
  }

  naechsteFrage() {
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
  }

  korrektheitPruefen(qid: number): void {
    if (this.zeigAktuelleAntwort != qid) {
      this.zeigAktuelleAntwort = qid;
      this.qcor = true
    }
    else {
      this.qcor = !this.qcor
    }
    this.refreshStats()
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
    return !this.frage.qanswers.some(a => a.givenans !== a.correct);
  }

  refreshStats() {
    this.stats = this.stat.berStatMC()
  }
}