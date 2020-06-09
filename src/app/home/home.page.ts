import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { QuranPart, QuranPage } from '../models/QuranPart'
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../models/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private http: HttpClient,
      private router: Router,
      public ser: GeneralService) {

  }

  ngOnInit() {
    this.list().subscribe(parts => {
      this.ser.Quran = parts;
      //console.debug(parts);
    });
  }

  showPage(item: QuranPart){
    this.ser.CurrentPart = item;
    this.router.navigate(['/home/select']);
  }

  private readonly URL = 'assets/info.json';
  public list(): Observable<QuranPart[]> {
    return this.http.get<QuranPart[]>(this.URL);
  }
}
