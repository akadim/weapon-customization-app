import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomizeWeaponServiceService } from './customize-weapon-service.service';
import { WeaponType } from './weapon-type';
import { WeaponOptic } from './weapon-optic';
import { WeaponAmmunition } from './weapon-ammunition';
import { environment } from 'src/environments/environment';
import { WeaponConfiguration } from './weapon-configuration';
import { WeaponArsenal } from './weapon-arsenal';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customize-weapon-dialog',
  templateUrl: './customize-weapon-dialog.component.html',
  styleUrls: ['./customize-weapon-dialog.component.scss']
})
export class CustomizeWeaponDialogComponent implements OnInit {
  
  /* Weapon Types list */ 
  weaponTypes: WeaponType[];

  /* Weapon Optics list */
  weaponOptics: WeaponOptic[];

  /* Weapon Ammunitions List */
  weaponAmmunitions: WeaponAmmunition[];

  /* Weapon Configuration */
  weaponConfiguration: WeaponConfiguration;

  /* Weapon Arsenal that contains all the assets */
  weaponArsenal: WeaponArsenal;

  selectedWeaponType: WeaponType;
  selectedWeaponOptic: WeaponOptic;
  selectedWeaponAmmunition: WeaponAmmunition;

  weaponForm: FormGroup;

  @ViewChild('weaponTypeImage', { static: false }) weaponTypeImage: ElementRef;
  @ViewChild('weaponOpticImage', { static: false }) weaponOpticImage: ElementRef;
  @ViewChild('weaponAmmunitionImage', { static: false }) weaponAmmunitionImage: ElementRef;

  

  constructor(private customizeWeaponService: CustomizeWeaponServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    
   this.weaponForm = this.formBuilder.group({
      name: [''],
      type: [''],
      optic: [''],
      ammunition: ['']
   });
     
     forkJoin(
      this.customizeWeaponService.getWeaponConfiguration(),
      this.customizeWeaponService.getAllWeaponOptions()
     ).subscribe((result) => {
          this.weaponConfiguration = result[0];
          this.weaponArsenal = result[1];

          this.weaponArsenal.weaponTypes.forEach( (weaponType) => {
                  if(this.weaponConfiguration.type === weaponType.id) {
                     this.selectedWeaponType = weaponType;
                     this.selectedWeaponType.image = environment.apiUrl + '/images/weapon-types/' + this.selectedWeaponType.image;
                  }
            });

            this.weaponArsenal.weaponOptics.forEach( (weaponOptic) => {
                  if(this.weaponConfiguration.optic === weaponOptic.id) {
                     this.selectedWeaponOptic = weaponOptic;
                     this.selectedWeaponOptic.image = environment.apiUrl + '/images/weapon-optics/' + this.selectedWeaponOptic.image;
                  }
            });

            this.weaponArsenal.weaponAmmunitions.forEach( (weaponAmmunition) => {
                  if(this.weaponConfiguration.ammunition === weaponAmmunition.id) {
                     this.selectedWeaponAmmunition = weaponAmmunition;
                     this.selectedWeaponAmmunition.image = environment.apiUrl + '/images/weapon-ammunitions/' + this.selectedWeaponAmmunition.image;
                  }
            });

            this.weaponForm = this.formBuilder.group({
               name: [this.weaponConfiguration.name],
               type: [this.weaponConfiguration.type],
               optic: [this.weaponConfiguration.optic],
               ammunition: [this.weaponConfiguration.ammunition]
            });

     });

  }

  onChangeWeaponType(event) {
     let id = parseInt(event.value);

     this.customizeWeaponService.getWeaponType(id).subscribe( (weaponType) => {
         this.weaponTypeImage.nativeElement.src = environment.apiUrl + '/images/weapon-types/' + weaponType.image;
     });
  }

  onChangeWeaponOptic(event) {
      let id = parseInt(event.value);

      this.customizeWeaponService.getWeaponOptic(id).subscribe( (weaponType) => {
         this.weaponOpticImage.nativeElement.src = environment.apiUrl + '/images/weapon-optics/' + weaponType.image;
      });
   }

   onChangeWeaponAmmunition(event) {
      let id = parseInt(event.value);

      this.customizeWeaponService.getWeaponAmmunition(id).subscribe( (weaponType) => {
         this.weaponAmmunitionImage.nativeElement.src = environment.apiUrl + '/images/weapon-ammunitions/' + weaponType.image;
      });
   }

   onSubmit() {
       console.log(this.weaponForm.value);
   }
}
