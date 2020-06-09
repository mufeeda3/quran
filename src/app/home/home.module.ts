import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { SelectComponent } from '../select/select.component';
import { GeneralService } from '../models/general.service';
import { BasicComponent } from '../basic/basic.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: HomePage },
      { path: 'select', component: SelectComponent },
      { path: 'view', component: BasicComponent }
    ])
  ],
  declarations: [HomePage,SelectComponent,BasicComponent],
  providers: [GeneralService]
})
export class HomePageModule {}
