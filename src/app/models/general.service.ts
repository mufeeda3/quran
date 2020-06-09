import { Injectable } from '@angular/core';
import { QuranPart, QuranPage } from './QuranPart';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  Quran: QuranPart[];
  CurrentPart: QuranPart;
  CurrentPage: QuranPage;
  ReadingMode: string;
  Timeout: number;
  constructor() {
    this.ReadingMode = '2';
    this.Timeout = 0;
  }
}
