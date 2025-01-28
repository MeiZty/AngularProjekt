import { Injectable } from '@angular/core';
import { Query } from './Interfaces/Interface.q';
import { QserviceService } from './qservice.service';
import { Stats } from './Interface.s';
import { llceFrage } from './Interfaces/Interface.lce';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  SC_fragen: Query[] = []
  All_fragen: Query[] = []
  MC_fragen: Query[] = []
  Fi_fragen: Query[] = []

  frGef: llceFrage[] = []
  antete: llceFrage[] = []
  antwFalsch: llceFrage[] = []

  frAnzahl = -1;
  frCheckFalsch = -1;
  frAntete = false;

  stats: Stats;

  constructor(private qserv: QserviceService) {
    this.SC_fragen = this.qserv.getSCQ()
    this.MC_fragen = this.qserv.getMCQ()
    this.Fi_fragen = this.qserv.getFiQ()
    this.All_fragen = this.qserv.getAllQ()

    this.stats = {
      mnum: 0,
      ansd: 0,
      falsch: 0,
      richtig: 0,
      nixbeant: 0

    }
  }
  nullStats() {
    this.stats.mnum = 0;
    this.stats.ansd = 0;
    this.stats.falsch = 0;
    this.stats.richtig = 0;
    this.stats.nixbeant = 0;
  }
  zurSetzMC() {
    this.nullStats()
    return this.berStatMC();
  }
  zurSetzSC() {
    this.nullStats()
    return this.berStatSC
  }
  zurSetzFI() {
    this.nullStats()
    return this.berStatFi
  }
  zurSetzAll() {
    this.nullStats()
    return this.berStatAll
  }


  berStatMC() {
    this.stats.mnum = this.MC_fragen.length
    if (this.MC_fragen.findIndex(f => f.qanswers.findIndex(a => a.givenans === true)) > 0) {
      this.stats.ansd = this.MC_fragen.filter(f => f.qanswers.findIndex(a => a.givenans === true) != -1).length
    }
    this.stats.nixbeant = this.stats.mnum - this.stats.ansd;

    this.stats.falsch = this.MC_fragen
      .filter(f => f.qanswers
        .findIndex(a => a.givenans === true) > -1)
      .filter(f => f.qanswers
        .findIndex(a => a.correct != a.givenans) > -1).length
    this.stats.richtig = this.stats.ansd - this.stats.falsch
    this.stats.falsch = this.antwFalsch.length
    return this.stats;
  }
  berStatSC() {
    this.stats.mnum = this.SC_fragen.length
    if (this.SC_fragen.findIndex(f => f.qanswers.findIndex(a => a.givenans === true)) > -1) {
      this.stats.ansd = this.SC_fragen.filter(f => f.qanswers.findIndex(a => a.givenans === true) != -1).length
    }
    this.stats.nixbeant = this.stats.mnum - this.stats.ansd;

    this.stats.falsch = this.SC_fragen
      .filter(f => f.qanswers
        .findIndex(a => a.givenans === true) > -1)
      .filter(f => f.qanswers
        .findIndex(a => a.correct != a.givenans) > -1).length
    this.stats.richtig = this.stats.ansd - this.stats.falsch
    return this.stats;
  }
  berStatFi() {
    this.stats.mnum = this.Fi_fragen.length

    this.stats.ansd = this.Fi_fragen.filter(f => f.qgiventxt != '').length

    this.stats.nixbeant = this.stats.mnum - this.stats.ansd

    this.stats.richtig = this.Fi_fragen.filter(
      f => f.qanswers.find(a => a.txt.find(
        t => t === f.qgiventxt))).length

    this.stats.falsch = this.stats.ansd - this.stats.richtig
    return this.stats;
  }
  berStatAll() {
    this.stats.mnum = this.All_fragen.length

    let mcs =
      this.All_fragen.filter(q => q.qtyp === 'mc').
        filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1).length

    let scs =
      this.All_fragen.filter(q => q.qtyp === 'sc')
        .filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1).length

    let fis =
      this.All_fragen.filter(q => q.qtyp === 'fi').filter(q => q.qgiventxt != '').length

    this.stats.ansd = mcs + scs + fis
    console.log(mcs, scs, fis)

    // // not answered
    this.stats.nixbeant = this.stats.mnum - mcs - scs - fis

    // // correct answered
    // mcs not correct
    let notcorrectmcs = this.All_fragen.filter(q => q.qtyp === 'mc')
      .filter(q => q.qanswers.findIndex(a => a.correct != a.givenans) > -1).length
    console.log('mcs n c:', notcorrectmcs)
    // scs not correct
    let notcorrectscs = this.All_fragen.filter(q => q.qtyp === 'sc')
      .filter(q => q.qanswers.findIndex(a => a.correct != a.givenans) > -1).length
    console.log('scs n c:', notcorrectscs)
    // fis not correct
    let notcorrectfis = this.All_fragen.filter(q => q.qtyp === 'fi')
      .filter(q => q.qanswers.findIndex(a => a.txt.find(t => t === q.qgiventxt))).length
    console.log('fis n c:', notcorrectfis)

    this.stats.richtig = this.stats.mnum - notcorrectmcs - notcorrectscs - notcorrectfis
    // // wrong answered
    this.stats.falsch = this.stats.nixbeant - (notcorrectmcs + notcorrectscs + notcorrectfis)

    return this.stats;
  }
}