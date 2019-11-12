import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomizeWeaponServiceService } from './customize-weapon-service.service';
import { WeaponType } from './weapon-type';
import { WeaponOptic } from './weapon-optic';
import { WeaponAmmunition } from './weapon-ammunition';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customize-weapon-dialog',
  templateUrl: './customize-weapon-dialog.component.html',
  styleUrls: ['./customize-weapon-dialog.component.scss']
})
export class CustomizeWeaponDialogComponent implements OnInit {
  
  weaponTypes: WeaponType[];
  weaponOptics: WeaponOptic[];
  weaponAmmunitions: WeaponAmmunition[];

  selectedWeaponType: WeaponType;
  selectedWeaponOptic: WeaponOptic;
  selectedWeaponAmmunition: WeaponAmmunition;

  @ViewChild('weaponTypeImage', { static: false }) weaponTypeImage: ElementRef;

  constructor(private customizeWeaponService: CustomizeWeaponServiceService) { }

  ngOnInit() {

     this.customizeWeaponService.getAllWeaponTypes().subscribe( (weaponTypes) => {
        this.weaponTypes = weaponTypes;
        this.selectedWeaponType = this.weaponTypes[0];
        this.selectedWeaponType.image = environment.apiUrl + '/images/weapon-types/' + this.selectedWeaponType.image;
        //this.weaponTypeImage.nativeElement.src = this.selectedWeaponType.image;
     });

     this.customizeWeaponService.getAllWeaponOptics().subscribe( (weaponOptics) => {
        this.weaponOptics = weaponOptics;
        this.selectedWeaponOptic = this.weaponOptics[0];
        this.selectedWeaponOptic.image = environment.apiUrl + '/images/weapon-optics/' + this.selectedWeaponOptic.image;
     });

     this.customizeWeaponService.getAllWeaponAmmunitions().subscribe( (weaponAmmunitions) => {
        this.weaponAmmunitions = weaponAmmunitions;
        this.selectedWeaponAmmunition = this.weaponAmmunitions[0];
        this.selectedWeaponAmmunition.image = environment.apiUrl + '/images/weapon-ammunitions/' + this.selectedWeaponAmmunition.image;
     });

  }
}
