import { Component } from '@angular/core';
import { Query } from '../Interfaces/Interface.q';
import { QserviceService } from '../qservice.service';
import { StatsService } from '../stats.service';
import { Stats } from '../Interface.s';

@Component({
    selector: 'bm-check.s',
    templateUrl: './check.s.component.html',
    styleUrls: ['./check.s.component.css'],
    standalone: false
})
export class CheckSComponent {
  SC : Query[] = []
  SCfound: Query[] = []
  statss : Stats;

  constructor(
    private scf : QserviceService,
    private statts : StatsService
  ){
    this.SC = this.scf.getSCQ()
    this.statss = this.statts.berStatSC()
  }
}
