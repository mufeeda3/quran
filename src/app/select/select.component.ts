import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../models/general.service';
import { QuranPage } from '../models/QuranPart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {

  constructor(public ser: GeneralService,
    private router: Router) { }

  ngOnInit() {}

  showPage(item: QuranPage){
    this.ser.CurrentPage = item;
    this.router.navigate(['/home/view']);
  }
}
