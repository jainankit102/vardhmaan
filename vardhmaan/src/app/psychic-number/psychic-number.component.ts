import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { numberLinkCorrospondingToAlphbate, Utils } from '../shared/utils';
import { UserInfo } from '../user';

import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-psychic-number',
  templateUrl: './psychic-number.component.html',
  styleUrls: ['./psychic-number.component.scss']
})
export class PsychicNumberComponent implements OnInit, OnDestroy {

  constructor(private userInfoService: UserInfoService) { }

  private subscription = new Subscription();

  psychicValue: number | undefined;
  destinyNumber: number | undefined;
  soulNumber: number | undefined;
  kuaNumber: number | undefined;
  planesOfNumber = {
    physical: 0,
    mental: 0,
    emotional: 0,
    intutional: 0
  }

  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      const dateObject: Date = new Date(userData.dateOfBirth);
      const date = dateObject.getDate();
      this.psychicValue = Utils.isSpecialNumber(date) ? date : Utils.getSumOfDigits(date);
      this.destinyNumber = Utils.getSumInSingleNumber(`${date}${dateObject.getMonth() + 1}${dateObject.getFullYear()}`, true);
      this.soulNumber = this.getSoulNumber(userData);
      this.kuaNumber = this.calculateKuaNumber(dateObject, userData.gender);
      this.calculatePalensOfNumber(userData);
    }));

  }

  calculatePalensOfNumber(userData: UserInfo) {
    const numberOfDigit = userData.firstName.concat(userData.lastName).split('').map(char => numberLinkCorrospondingToAlphbate(char)).join('');
    this.planesOfNumber.physical = Utils.getNumberOccuranceChar(numberOfDigit, '5') + Utils.getNumberOccuranceChar(numberOfDigit, '4');
    this.planesOfNumber.mental = Utils.getNumberOccuranceChar(numberOfDigit, '1') + Utils.getNumberOccuranceChar(numberOfDigit, '8');
    this.planesOfNumber.emotional = Utils.getNumberOccuranceChar(numberOfDigit, '2') + Utils.getNumberOccuranceChar(numberOfDigit, '3') + Utils.getNumberOccuranceChar(numberOfDigit, '6');
    this.planesOfNumber.intutional = Utils.getNumberOccuranceChar(numberOfDigit, '7') + Utils.getNumberOccuranceChar(numberOfDigit, '9');
  }

  calculateKuaNumber(dateObject: Date, gender: string): number | undefined {
    const yearSum = Utils.getSumInSingleNumber(dateObject.getFullYear(), false);
    return gender === 'male' ? 11 - yearSum : Utils.getSumInSingleNumber(yearSum + 4);
  }

  getSoulNumber(userData: UserInfo) {
    const firstNameVowel = Utils.getVowelChars(userData.firstName);
    const lastNameVowel = Utils.getVowelChars(userData.lastName);
    const firstNameVowelSum = Utils.getSumInSingleNumber(Utils.getCharNumberCount(firstNameVowel), true);
    const lastNameVowelSum = Utils.getSumInSingleNumber(Utils.getCharNumberCount(lastNameVowel), true);
    return Utils.getSumInSingleNumber(firstNameVowelSum + lastNameVowelSum, true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
