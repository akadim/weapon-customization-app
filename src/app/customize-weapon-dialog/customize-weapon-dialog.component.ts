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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customize-weapon-dialog',
  templateUrl: './customize-weapon-dialog.component.html',
  styleUrls: ['./customize-weapon-dialog.component.scss']
})
export class CustomizeWeaponDialogComponent implements OnInit {
  
  /* Weapon Configuration */
  weaponConfiguration: WeaponConfiguration;

  /* Weapon Arsenal that contains all the assets */
  weaponArsenal: WeaponArsenal;

  selectedWeaponType: WeaponType;
  selectedWeaponOptic: WeaponOptic;
  selectedWeaponAmmunition: WeaponAmmunition;

  weaponForm: FormGroup;

  breakpointImage: number;
  breakpointSelect: number;

  @ViewChild('weaponTypeImage', { static: false }) weaponTypeImage: ElementRef;
  @ViewChild('weaponOpticImage', { static: false }) weaponOpticImage: ElementRef;
  @ViewChild('weaponAmmunitionImage', { static: false }) weaponAmmunitionImage: ElementRef;

  

  constructor(
     private customizeWeaponService: CustomizeWeaponServiceService, 
     private formBuilder: FormBuilder,
     private toastr: ToastrService
     ) { }

  ngOnInit() {

   this.breakpointImage = (window.innerWidth <= 400) ? 1 : 5;
   this.breakpointSelect = (window.innerWidth <= 400) ? 1 : 3;
    
   this.weaponForm = this.formBuilder.group({
      name: ['', Validators.required],
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
               name: [this.weaponConfiguration.name, Validators.required],
               type: [this.weaponConfiguration.type],
               optic: [this.weaponConfiguration.optic],
               ammunition: [this.weaponConfiguration.ammunition]
            });

     });

  }

  onResize(event) {
      this.breakpointImage = (event.target.innerWidth <= 400) ? 1 : 5;
      this.breakpointSelect = (event.target.innerWidth <= 800) ? 1 : 3;
   }

  onChangeWeaponType(event) {
     let id = parseInt(event.value);

     this.customizeWeaponService.getWeaponType(id).subscribe( (weaponType) => {
         this.weaponTypeImage.nativeElement.src = environment.apiUrl + '/images/weapon-types/' + weaponType.image;
     });
  }

  onChangeWeaponOptic(event) {
      let id = parseInt(event.value);

      this.customizeWeaponService.getWeaponOptic(id).subscribe( (weaponOptic) => {
         this.weaponOpticImage.nativeElement.src = environment.apiUrl + '/images/weapon-optics/' + weaponOptic.image;
      });
   }

   onChangeWeaponAmmunition(event) {
      let id = parseInt(event.value);

      this.customizeWeaponService.getWeaponAmmunition(id).subscribe( (weaponAmmunition) => {
         this.weaponAmmunitionImage.nativeElement.src = environment.apiUrl + '/images/weapon-ammunitions/' + weaponAmmunition.image;
      });
   }

   onSubmit() {
       this.customizeWeaponService.updateWeaponConfiguration(this.weaponForm.value).subscribe( (response) => {
            
            console.log("Weapon Configuration Name = " + response.name + "[Weapon = "+response['type']['title']+", Optic = "+ response['optic']['title'] +", Ammunition = " + response['ammunition']['title'] + "]");

            this.weaponConfiguration = {
               name: response.name,
               type: response['type']['id'],
               optic: response['optic']['id'],
               ammunition: response['ammunition']['id']
            };

            this.toastr.success('the Weapon is Successfully Upgraded, Check the console for more infos', 'Success!');
       });
   }

   onCancel() {

      const weaponType = this.weaponArsenal.weaponTypes.find((weaponType) => weaponType.id === this.weaponConfiguration.type );
      const weaponOptic = this.weaponArsenal.weaponOptics.find((weaponOptic) => weaponOptic.id === this.weaponConfiguration.optic );
      const weaponAmmunition = this.weaponArsenal.weaponAmmunitions.find((weaponAmmunition) => weaponAmmunition.id === this.weaponConfiguration.ammunition );

      this.weaponTypeImage.nativeElement.src =  (weaponType.image.indexOf('http') < 0) ? environment.apiUrl + '/images/weapon-types/' + weaponType.image :  weaponType.image;
      this.weaponOpticImage.nativeElement.src = (weaponOptic.image.indexOf('http') < 0) ? environment.apiUrl + '/images/weapon-optics/' + weaponOptic.image : weaponOptic.image;
      this.weaponAmmunitionImage.nativeElement.src = (weaponAmmunition.image.indexOf('http') < 0) ? environment.apiUrl + '/images/weapon-ammunitions/' + weaponAmmunition.image : weaponAmmunition.image;

      this.weaponForm = this.formBuilder.group({
         name: [this.weaponConfiguration.name, Validators.required],
         type: [this.weaponConfiguration.type],
         optic: [this.weaponConfiguration.optic],
         ammunition: [this.weaponConfiguration.ammunition]
      });
   }
}
