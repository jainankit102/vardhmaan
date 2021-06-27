import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { numberLinkCorrospondingToAlphbate, Utils } from '../shared/utils';
import { AllTypeOfNumbers, PrintTemplateMeta, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-destiny-by-name',
  templateUrl: './destiny-by-name.component.html',
  styleUrls: ['./destiny-by-name.component.scss']
})
export class DestinyByNameComponent implements OnInit, OnDestroy {

  title = 'Destiny By Name';
  destinyRawCalculation: string | undefined;
  destinyValue: number | undefined;

  fullName: string | undefined;

  private subscription = new Subscription();
  numberCorrospondingToName: string = '';
  lastNameSum: number = 0;
  firstNameSum: number = 0;
  destinyRawValue: string | number = 0;

  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      this.fullName = `${userData.firstName} ${userData.lastName}`;
      this.numberCorrospondingToName = userData.firstName.concat(userData.lastName).split('').map(char => numberLinkCorrospondingToAlphbate(char)).join('');

      this.firstNameSum = Utils.getSumOfCharNumberCount(userData.firstName);
      this.lastNameSum = Utils.getSumOfCharNumberCount(userData.lastName);
      this.destinyRawValue = this.firstNameSum + this.lastNameSum;
      this.destinyValue = Utils.getSumInSingleNumber(this.destinyRawValue, true);
      this.userInfoService.setNumberValueByName(AllTypeOfNumbers.DESTINY_BY_NAME, this.destinyValue);

    }));

    this.subscription.add(this.userInfoService.resetData.subscribe(data => {
      this.resetValue();
    }));
  }
  resetValue() {
    this.destinyValue = undefined;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
