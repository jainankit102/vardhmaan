import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utils } from '../shared/utils';
import { AllTypeOfNumbers, PrintTemplateMeta, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';


@Component({
  selector: 'app-personality-number',
  templateUrl: './personality-number.component.html',
  styleUrls: ['./personality-number.component.scss']
})
export class PersonalityNumberComponent implements OnInit, OnDestroy {

  title = 'Personality number';

  firstNameConsonant: string | undefined;
  lastNameConsonant: string | undefined;
  firstNameNumber: string | undefined;
  lastNameNumber: string | undefined;
  firstNameConsonantSum: number | undefined;
  lastNameConsonantSum: number | undefined;
  personalityValue: number | undefined;
  personalityRawValue: number | undefined;

  private subscription = new Subscription();

  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {

      this.resetValue();

      this.firstNameConsonant = userData.firstName.split('').filter(char => !Utils.isVowel(char)).join('');
      this.lastNameConsonant = userData.lastName.split('').filter(char => !Utils.isVowel(char)).join('');

      this.firstNameNumber = Utils.getNumbersCorrospondingToName(this.firstNameConsonant);
      this.lastNameNumber = Utils.getNumbersCorrospondingToName(this.lastNameConsonant);

      this.firstNameConsonantSum = Utils.getSumInSingleNumber(this.firstNameNumber, true);
      this.lastNameConsonantSum = Utils.getSumInSingleNumber(this.lastNameNumber, true);

      this.personalityRawValue = this.firstNameConsonantSum + this.lastNameConsonantSum;

      this.personalityValue = Utils.getSumInSingleNumber(this.personalityRawValue);
      this.userInfoService.setNumberValueByName(AllTypeOfNumbers.PERSONALITY, this.personalityValue);
    }));
  }

  resetValue() {
    this.firstNameConsonant = '';
    this.lastNameConsonant = '';
    this.firstNameNumber = '';
    this.lastNameNumber = '';
    this.personalityRawValue = undefined;
    this.personalityValue = undefined;
    this.userInfoService.setNumberValueByName(AllTypeOfNumbers.PERSONALITY, 0);
  }

  calculatePersonalityNumber(userData: UserInfo): number | undefined {
    const fullName = userData.firstName + userData.lastName;
    const constantCharInName = fullName.split('').filter(char => !Utils.isVowel(char)).join('');
    console.log(constantCharInName);
    console.log(Utils.getSumOfCharNumberCount(constantCharInName));

    return Utils.getSumInSingleNumber(Utils.getSumOfCharNumberCount(constantCharInName));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
