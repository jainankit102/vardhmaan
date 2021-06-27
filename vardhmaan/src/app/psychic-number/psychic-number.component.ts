import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { getLousGridMetaData, numberLinkCorrospondingToAlphbate, Utils } from '../shared/utils';
import { AllTypeOfNumbers, LousGridMeta, PrintTemplateMeta, UserInfo } from '../user';

import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-psychic-number',
  templateUrl: './psychic-number.component.html',
  styleUrls: ['./psychic-number.component.scss']
})
export class PsychicNumberComponent implements OnInit, OnDestroy, OnChanges {

  @Input() isReset = false;
  psychicRawCalculation: string | undefined;
  psychicRawValue: number | undefined;

  constructor(private userInfoService: UserInfoService) { }


  private subscription = new Subscription();

  psychicValue: number | undefined;
  destinyNumber: number | undefined;
  destinyNumberByName: number | undefined;
  soulNumber: number | undefined;
  kuaNumber: number | undefined;
  planesOfNumber = {
    numberConversion: '',
    physical: 0,
    mental: 0,
    emotional: 0,
    intutional: 0
  }
  personalityNumber: number | undefined;

  title = 'Psychic Number';

  lousGridData: Array<LousGridMeta> = [...getLousGridMetaData()]

  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      this.resetValues();
      const dateObject: Date = new Date(userData.dateOfBirth);
      const date = dateObject.getDate();
      this.psychicRawCalculation = date.toString().split('').join(' + ');
      this.psychicRawValue = eval(this.psychicRawCalculation);
      this.psychicValue = Utils.isSpecialNumber(date) ? date : Utils.getSumInSingleNumber(date, true);
      this.userInfoService.setNumberValueByName(AllTypeOfNumbers.PSYCHIC, this.psychicValue);


      this.destinyNumber = Utils.getSumInSingleNumber(`${date}${dateObject.getMonth() + 1}${dateObject.getFullYear()}`, true);
      this.soulNumber = this.getSoulNumber(userData);
      this.kuaNumber = this.calculateKuaNumber(dateObject, userData.gender);
      this.destinyNumberByName = this.calculateDestinyNumberByName(userData);
      this.personalityNumber = this.calculatePersonalityNumber(userData);
      this.calculatePalensOfNumber(userData);
      this.calculateLousGridValue(userData);
    }));

    this.subscription.add(this.userInfoService.resetData.subscribe(data => {
      this.resetValues();
    }))

  }
  calculatePersonalityNumber(userData: UserInfo): number | undefined {
    const fullName = userData.firstName + userData.lastName;
    const constantCharInName = fullName.split('').filter(char => !Utils.isVowel(char)).join('');
    console.log(constantCharInName);
    console.log(Utils.getSumOfCharNumberCount(constantCharInName));

    return Utils.getSumInSingleNumber(Utils.getSumOfCharNumberCount(constantCharInName));

  }
  calculateDestinyNumberByName(userData: UserInfo): number | undefined {
    const firstNameSum = Utils.getSumInSingleNumber(Utils.getSumOfCharNumberCount(userData.firstName));
    const lastNanemSum = Utils.getSumInSingleNumber(Utils.getSumOfCharNumberCount(userData.lastName));
    return Utils.getSumInSingleNumber(firstNameSum + lastNanemSum);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isReset = true) {
      this.resetValues();
    }
  }

  resetValues() {
    this.psychicValue = undefined;
    this.destinyNumber = undefined;
    this.soulNumber = undefined;
    this.kuaNumber = undefined;
    this.planesOfNumber = {
      numberConversion: '',
      physical: 0,
      mental: 0,
      emotional: 0,
      intutional: 0
    };
    this.lousGridData = [...getLousGridMetaData()]
  }

  calculateLousGridValue(userData: UserInfo) {
    const dateObject: Date = new Date(userData.dateOfBirth);
    const fullDateAsString = `${dateObject.getDate()}${dateObject.getMonth() + 1}${dateObject.getFullYear()}`;
    for (let i = 1; i < 10; i++) {
      const getNumOccrace = Utils.getNumberOccuranceChar(fullDateAsString, String(i));
      if (getNumOccrace) {
        this.updateLousGrid(i, getNumOccrace);
      }
    }

    this.updateLousGrid(Utils.getSumInSingleNumber(this.psychicValue as number), 1, true);
    this.updateLousGrid(Utils.getSumInSingleNumber(this.destinyNumber as number), 1, true);
    this.updateLousGrid(this.kuaNumber, 1, true);

  }
  updateLousGrid(placeholder: number | undefined, value: number, isSpecialValue = false) {
    this.lousGridData.forEach(obj => {
      if (obj.placeholder === placeholder) {
        if (isSpecialValue) {
          obj.value = obj.value === 'X' ? '' : obj.value;
          obj.specialNumber = obj.specialNumber ? `${obj.specialNumber}${placeholder}` : placeholder;
        } else {
          obj.value = new Array(value).fill(placeholder).join('');
        }
      }
    });
  }

  calculatePalensOfNumber(userData: UserInfo) {
    const numberOfDigit = userData.firstName.concat(userData.lastName).split('').map(char => numberLinkCorrospondingToAlphbate(char)).join('');
    this.planesOfNumber.numberConversion = numberOfDigit;
    this.planesOfNumber.physical = Utils.getNumberOccuranceChar(numberOfDigit, '5') + Utils.getNumberOccuranceChar(numberOfDigit, '4');
    this.planesOfNumber.mental = Utils.getNumberOccuranceChar(numberOfDigit, '1') + Utils.getNumberOccuranceChar(numberOfDigit, '8');
    this.planesOfNumber.emotional = Utils.getNumberOccuranceChar(numberOfDigit, '2') + Utils.getNumberOccuranceChar(numberOfDigit, '3') + Utils.getNumberOccuranceChar(numberOfDigit, '6');
    this.planesOfNumber.intutional = Utils.getNumberOccuranceChar(numberOfDigit, '7') + Utils.getNumberOccuranceChar(numberOfDigit, '9');
  }

  calculateKuaNumber(dateObject: Date, gender: string): number | undefined {
    const yearSum = Utils.getSumInSingleNumber(dateObject.getFullYear(), false);
    return gender === 'male' ? Utils.getSumInSingleNumber(11 - yearSum) : Utils.getSumInSingleNumber(yearSum + 4);
  }

  getSoulNumber(userData: UserInfo) {
    const firstNameVowel = Utils.getVowelChars(userData.firstName);
    const lastNameVowel = Utils.getVowelChars(userData.lastName);
    const firstNameVowelSum = Utils.getSumInSingleNumber(Utils.getSumOfCharNumberCount(firstNameVowel), true);
    const lastNameVowelSum = Utils.getSumInSingleNumber(Utils.getSumOfCharNumberCount(lastNameVowel), true);
    return Utils.getSumInSingleNumber(firstNameVowelSum + lastNameVowelSum, true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
