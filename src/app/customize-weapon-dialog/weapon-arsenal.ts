import { WeaponType } from './weapon-type';
import { WeaponOptic } from './weapon-optic';
import { WeaponAmmunition } from './weapon-ammunition';

export class WeaponArsenal {
    weaponTypes: WeaponType[];
    weaponOptics: WeaponOptic[];
    weaponAmmunitions: WeaponAmmunition[];
}