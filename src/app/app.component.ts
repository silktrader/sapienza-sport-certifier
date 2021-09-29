import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import { IData } from './idata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Sapienza Sport Self-Certification';

  hasData$ = this.dataService.hasData$();

  time = new FormControl('morning', Validators.required);
  date = new FormControl(new Date(), Validators.required);

  private data: IData | null | undefined;

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.dataService.data$().subscribe((d) => (this.data = d));
  }

  resetData() {
    this.dataService.resetData();
  }

  submitCertificationData() {
    if (this.data == null) return;

    const date = this.date.value as Date;

    const submission = {
      'entry.271966878': '',
      'entry.1320245094': this.data.surname,
      'entry.744658025': this.data.name.split(' ').join('+'),
      'entry.152658272': '3518803101',
      'entry.46755261': '',
      'entry.1667534577_year': date.getFullYear(),
      'entry.1667534577_month': date.getMonth() + 1,
      'entry.1667534577_day': date.getDate(),
      'entry.1683771221': 'SapienzaSport',
      'entry.941052641': 'Tor+di+Quinto',
      'entry.7933295': 'Pomeriggio',
      'entry.1128450622': 'Acconsento',
      'entry.533001545': 'SONO+in+possesso+di+GREEN+PASS',
      'entry.1683771221_sentinel': '',
      'entry.941052641_sentinel': '',
      'entry.7933295_sentinel': '',
      'entry.1128450622_sentinel': '',
      'entry.533001545_sentinel': '',
      fvv: '1',
      draftResponse:
        '[null,null,"1669695377222512164",null,null,null,"' +
        this.data.email +
        '",1]',
      pageHistory: '0,1',
      fbzx: '1669695377222512164',
    };

    let params = new HttpParams();

    Object.entries(submission).forEach((entry) => {
      params = params.append(entry[0], entry[1]);
    });

    this.http
      .post(
        'https://docs.google.com/forms/d/e/1FAIpQLSdcxSqD7NTPYdA_k_n0WW2KG2gKC3ptZq-ELf9lZ9GJk4vGsA/formResponse',
        params,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        }
      )
      .subscribe((result) => {
        console.log(result);
      });
  }
}
