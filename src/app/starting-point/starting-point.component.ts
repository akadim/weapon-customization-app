import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomizeWeaponDialogComponent } from '../customize-weapon-dialog/customize-weapon-dialog.component';

@Component({
  selector: 'app-starting-point',
  templateUrl: './starting-point.component.html',
  styleUrls: ['./starting-point.component.scss']
})
export class StartingPointComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let WeaponDialog = this.dialog.open(CustomizeWeaponDialogComponent, {
        width: '800px'
    });
  }

}
