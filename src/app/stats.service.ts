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
    this.stats.ansd = 0;
    this.stats.ansd = this.MC_fragen.filter(f => f.qanswers.some(a => a.givenans === true)).length
    this.stats.nixbeant = this.stats.mnum - this.stats.ansd;
    this.stats.falsch = this.MC_fragen
      .filter(f => f.qanswers.some(a => a.givenans === true))
      .filter(f => f.qanswers.some(a => a.givenans !== a.correct))
      .length
    this.stats.richtig = this.stats.ansd - this.stats.falsch
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

    let mcs_ansd =
      this.All_fragen.filter(q => q.qtyp === 'mc')
                     .filter(q => q.qanswers.some(a => a.givenans === true)).length

    let scs_ansd =
      this.All_fragen.filter(q => q.qtyp === 'sc')
                     .filter(q => q.qanswers.some(a => a.givenans === true)).length

    let fis_ansd =
      this.All_fragen.filter(q => q.qtyp === 'fi')
                     .filter(q => q.qgiventxt != '').length

    this.stats.ansd = mcs_ansd + scs_ansd + fis_ansd

    let falsch_mcs = this.All_fragen.filter(q => q.qtyp === 'mc')
      .filter(q => q.qanswers.some(a => a.givenans === true) && q.qanswers
      .some(a => a.correct != a.givenans)).length

    let falsch_scs = this.All_fragen.filter(q => q.qtyp === 'sc')
      .filter(q => q.qanswers.some(a => a.givenans === true) && q.qanswers
      .some(a => a.correct != a.givenans)).length

    let falsch_fis = this.All_fragen.filter(q => q.qtyp === 'fi')
      .filter(q => {
        return q.qgiventxt && q.qgiventxt !== '' && !q.qanswers
        .some(a => a.txt.includes(q.qgiventxt!));
      }).length

    this.stats.falsch = falsch_mcs + falsch_scs + falsch_fis

    this.stats.richtig = this.stats.ansd - this.stats.falsch

    this.stats.nixbeant = this.stats.mnum - this.stats.ansd

    return this.stats;
  }
}