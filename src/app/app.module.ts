import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { CustomizeWeaponDialogComponent } from './customize-weapon-dialog/customize-weapon-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { StartingPointComponent } from './starting-point/starting-point.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReactiveFormsModule  } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    CustomizeWeaponDialogComponent,
    StartingPointComponent
  ],
  entryComponents: [CustomizeWeaponDialogComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
