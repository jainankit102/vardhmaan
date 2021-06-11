import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utils } from '../shared/utils';
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

  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      const dateObject: Date = new Date(userData.dateOfBirth);
      const date = dateObject.getDate();
      this.psychicValue = Utils.isSpecialNumber(date) ? date : Utils.getSumOfDigits(date);
      this.destinyNumber = Utils.getSumInSingleNumber(`${date}${dateObject.getMonth() + 1}${dateObject.getFullYear()}`);
    }));

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
