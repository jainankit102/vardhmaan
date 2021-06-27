import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DigitInWord, Utils } from '../shared/utils';
import { PlanesOfNumberMeta, PrintTemplateMeta, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-planes-of-numbers',
  templateUrl: './planes-of-numbers.component.html',
  styleUrls: ['./planes-of-numbers.component.scss']
})
export class PlanesOfNumbersComponent implements OnInit, OnDestroy {

  listOfPlanesOfNumber: Array<PlanesOfNumberMeta> = [];
  fullName: string | undefined;
  firstNameNumber: string | undefined;
  lastNameNumber: string | undefined;
  fullNameNumber: string | undefined;

  private subscription = new Subscription();

  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      this.resetValue();
      this.fullName = `${userData.firstName} ${userData.lastName}`;
      this.firstNameNumber = Utils.getNumbersCorrospondingToName(userData.firstName);
      this.lastNameNumber = Utils.getNumbersCorrospondingToName(userData.lastName);
      this.fullNameNumber = `${this.firstNameNumber}${this.lastNameNumber}`;

      this.listOfPlanesOfNumber.push(this.getNumMeta('Physical', [5, 4]));
      this.listOfPlanesOfNumber.push(this.getNumMeta('Mental', [1, 8]));
      this.listOfPlanesOfNumber.push(this.getNumMeta('Emotional', [2, 3, 6]));
      this.listOfPlanesOfNumber.push(this.getNumMeta('Intutional', [7, 9]));

      // this.planesOfNumber.numberConversion = numberOfDigit;
      // this.planesOfNumber.physical = Utils.getNumberOccuranceChar(numberOfDigit, '5') + Utils.getNumberOccuranceChar(numberOfDigit, '4');
      // this.planesOfNumber.mental = Utils.getNumberOccuranceChar(numberOfDigit, '1') + Utils.getNumberOccuranceChar(numberOfDigit, '8');
      // this.planesOfNumber.emotional = Utils.getNumberOccuranceChar(numberOfDigit, '2') + Utils.getNumberOccuranceChar(numberOfDigit, '3') + Utils.getNumberOccuranceChar(numberOfDigit, '6');
      // this.planesOfNumber.intutional = Utils.getNumberOccuranceChar(numberOfDigit, '7') + Utils.getNumberOccuranceChar(numberOfDigit, '9');

    }));
    this.subscription.add(this.userInfoService.resetData.subscribe(data => {
      this.resetValue();
    }));
  }

  resetValue(): void {
    this.listOfPlanesOfNumber = [];
    this.firstNameNumber = '';
    this.fullName = '';
    this.lastNameNumber = '';
    this.fullNameNumber = '';
  }

  getNumMeta(title: string, arrayOfNumber: Array<number>): PlanesOfNumberMeta {
    let expression = '';
    let value = 0;
    arrayOfNumber.map((num, index) => {
      const occurance = Utils.getNumberOccuranceChar(this.fullNameNumber as string, num.toString());
      value += occurance;
      expression += `${DigitInWord[occurance]} ${num}'s`;
      if (index !== arrayOfNumber.length - 1) {
        expression += ' + ';

      }
    });
    return {
      title,
      value,
      expression
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
