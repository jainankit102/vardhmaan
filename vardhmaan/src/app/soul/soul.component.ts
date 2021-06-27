import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utils } from '../shared/utils';
import { AllTypeOfNumbers, PrintTemplateMeta, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-soul',
  templateUrl: './soul.component.html',
  styleUrls: ['./soul.component.scss']
})
export class SoulComponent implements OnInit, OnDestroy {

  title = 'Soul number';
  soulValue: number | undefined;
  lastNameVowels: string | undefined;
  firstNameVowels: string | undefined;
  firstNameNumber: string | undefined;
  lastNameNumber: string | undefined;
  lastNameVowelSum: number | undefined;
  firstNameVowelSum: number | undefined;

  private subscription = new Subscription();
  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      this.firstNameVowels = Utils.getVowelChars(userData.firstName);
      this.lastNameVowels = Utils.getVowelChars(userData.lastName);

      this.firstNameNumber = Utils.getNumbersCorrospondingToName(this.firstNameVowels);
      this.lastNameNumber = Utils.getNumbersCorrospondingToName(this.lastNameVowels);

      this.firstNameVowelSum = Utils.getSumInSingleNumber(this.firstNameNumber, true);
      this.lastNameVowelSum = Utils.getSumInSingleNumber(this.lastNameNumber, true);

      this.soulValue = Utils.getSumInSingleNumber(this.firstNameVowelSum + this.lastNameVowelSum, true);
      this.userInfoService.setNumberValueByName(AllTypeOfNumbers.SOUL, this.soulValue);


    }));
    this.subscription.add(this.userInfoService.resetData.subscribe(data => {
      this.resetValue();
    }));
  }
  resetValue() {
    this.soulValue = undefined;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}