import { Component, OnInit, ViewChild } from '@angular/core';
import { QuranPage, QuranVerse } from '../models/QuranPart';
import { GeneralService } from '../models/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  Page: QuranPage;
  Index: number;
  WordIndex: number;
  ContentVerse: string;
  VerseTitle: string;
  ReadingMode: string;

  lbSelectVerse: string = 'secondary';
  lbSelectWord: string = 'secondary';
  lbSelectThree: string = 'secondary';

  constructor(public ser: GeneralService,
    private router: Router) {
    this.Index = -1;
    this.WordIndex = -1;
    this.Page = this.ser.CurrentPage;
    this.ContentVerse = "-----------";
    this.VerseTitle = "";
    this.ReadingMode = this.ser.ReadingMode;
    if (ser.Timeout < 0) {
      ser.Timeout = 0;
    }
    this.modeSelectChange();
  }

  modeSelectChange() {
    if (this.ReadingMode == '1') {
      this.lbSelectVerse = 'success';
      this.lbSelectWord = 'secondary';
      this.lbSelectThree = 'secondary';
    }
    else if (this.ReadingMode == '2') {
      this.lbSelectVerse = 'secondary';
      this.lbSelectWord = 'success';
      this.lbSelectThree = 'secondary';
    }
    else {
      this.lbSelectVerse = 'secondary';
      this.lbSelectWord = 'secondary';
      this.lbSelectThree = 'success';
    }
  }
  ngOnInit() {
    if (this.ser.Timeout < 0) {
      this.ser.Timeout = 0;
    }
    if (!this.ser.CurrentPage) {
      this.router.navigate(['/home']);
    } else {
      this.Page = this.ser.CurrentPage;
      this.ContentVerse = "--------";
      this.VerseTitle = "";
    }
    this.ReadingMode = this.ser.ReadingMode;
    this.modeSelectChange();
  }

  changeTimeout(val: number) {
    this.initAll();
    if (this.ser.Timeout > 0.1 && val == -1) {
      this.ser.Timeout = this.ser.Timeout - 0.2;
    }
    else if (this.ser.Timeout < 120 && val == 1) {
      this.ser.Timeout = this.ser.Timeout + 0.2;
    }
  }

  resetPage() {
    this.initAll();
  }

  prevPage() {
    let index = this.ser.CurrentPart.Pages.indexOf(this.Page);
    if (index > 0) {
      this.initAll();
      index = index - 1;
      this.ser.CurrentPage = this.ser.CurrentPart.Pages[index];
      this.Page = this.ser.CurrentPage;
    }
  }

  nextPage() {
    let index = this.ser.CurrentPart.Pages.indexOf(this.Page);
    if (index >= 0 && index < this.ser.CurrentPart.Pages.length - 1) {
      this.initAll();
      index = index + 1;
      this.ser.CurrentPage = this.ser.CurrentPart.Pages[index];
      this.Page = this.ser.CurrentPage;
    }
  }

  initAll() {
    this.Index = -1;
    this.WordIndex = -1;
    this.ContentVerse = "-----------";
    this.VerseTitle = "";
  }

  readingModeChanged(mode: any) {
    this.Index = -1;
    this.WordIndex = -1;
    this.ReadingMode = mode;
    this.ser.ReadingMode = mode;
    this.modeSelectChange();
    this.showHide();
  }

  showHide() {
    if (this.Page.Verses.length == 0) {
      this.ContentVerse = "Empty Page";
    }
    else if (this.Page.Verses[0].Words.length == 0) {
      this.ContentVerse = "Empty Words";
    }
    else if (this.ReadingMode == '1') {
      this.nextVerse();
    }
    else if (this.ReadingMode == '3') {
      this.nextWordThree();
    } else {
      this.nextWord();
    }
  }

  nextWordThree() {
    if (this.Index >= this.Page.Verses.length) {
      this.initAll();
    }
    else if (this.Index < 0) {
      this.WordIndex = -1;
      this.Index = 0;
      this.showHide();
    }
    else if (this.WordIndex >= this.Page.Verses[this.Index].Words.length - 1) {
      this.WordIndex = -1;
      this.Index = this.Index + 1;
      this.showHide();
    }
    else {
      this.WordIndex = this.WordIndex + 3;

      let str = "";
      for (let i = 0; i < this.Page.Verses[this.Index].Words.length && i <= this.WordIndex; i++) {
        const element = this.Page.Verses[this.Index].Words[i];
        if (i > 0) {
          str = str + " ";
        }
        str += element.Name;
      }
      this.ContentVerse = str;
      str = this.Page.Verses[this.Index].Name;
      str = str.replace('Verse', 'الآية');
      this.VerseTitle = str;
      if (this.ser.Timeout > 0)
        setTimeout(() => { this.showHide(); }, this.ser.Timeout * 1000);
    }
  }

  nextWord() {
    if (this.Index >= this.Page.Verses.length) {
      this.initAll();
    }
    else if (this.Index < 0) {
      this.WordIndex = -1;
      this.Index = 0;
      this.showHide();
    }
    else if (this.WordIndex >= this.Page.Verses[this.Index].Words.length - 1) {
      this.WordIndex = -1;
      this.Index = this.Index + 1;
      this.showHide();
    }
    else {
      this.WordIndex = this.WordIndex + 1;

      let str = "";
      for (let i = 0; i < this.Page.Verses[this.Index].Words.length && i <= this.WordIndex; i++) {
        const element = this.Page.Verses[this.Index].Words[i];
        if (i > 0) {
          str = str + " ";
        }
        str += element.Name;
      }
      this.ContentVerse = str;
      str = this.Page.Verses[this.Index].Name;
      str = str.replace('Verse', 'الآية');
      this.VerseTitle = str;
      if (this.ser.Timeout > 0)
        setTimeout(() => { this.showHide(); }, this.ser.Timeout * 1000);
    }
  }

  nextVerse() {
    this.Index = this.Index + 1;
    if (this.Index >= this.Page.Verses.length) {
      this.initAll();
    }
    else {
      let str = "";
      this.Page.Verses[this.Index].Words.forEach(item => {
        str = str + " " + item.Name
      });
      this.ContentVerse = str;
      str = this.Page.Verses[this.Index].Name;
      str = str.replace('Verse', 'الآية');
      this.VerseTitle = str;
      if (this.ser.Timeout > 0)
        setTimeout(() => { this.showHide(); }, this.ser.Timeout * 1000);
    }
  }
}
