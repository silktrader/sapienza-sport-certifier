import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IData as IData } from './idata';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _data$ = new BehaviorSubject<IData | null>(this.loadData());

  constructor() {}

  private loadData(): IData | null {
    const stringifiedData = localStorage.getItem('data');
    return stringifiedData ? JSON.parse(stringifiedData) : null;
  }

  public data$(): Observable<IData | null> {
    return this._data$.asObservable();
  }

  public hasData$(): Observable<Boolean> {
    return this._data$.pipe(map((data) => (data == null ? false : true)));
  }

  public setData(data: IData) {
    localStorage.setItem('data', JSON.stringify(data));
    this._data$.next(data);
  }

  resetData() {
    localStorage.clear();
    this._data$.next(null);
  }
}
