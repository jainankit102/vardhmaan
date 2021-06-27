import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utils } from '../shared/utils';
import { AllTypeOfNumbers, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

export const KuaGenderMeta = {
  male: 11,
  female: 4
}

@Component({
  selector: 'app-kua',
  templateUrl: './kua.component.html',
  styleUrls: ['./kua.component.scss']
})
export class KuaComponent implements OnInit, OnDestroy {

  title = 'Kua number';
  kuaRawCalculation: string | undefined;
  kuaValue: number | undefined;
  fullYear: number | undefined;
  yearSum: number | undefined;
  kuaExpression: string | undefined;
  kuaRawValue: number | undefined;

  private subscription = new Subscription();

  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      const dateObject: Date = new Date(userData.dateOfBirth);
      this.fullYear = dateObject.getFullYear();
      this.yearSum = Utils.getSumInSingleNumber(this.fullYear, false);
      this.kuaExpression = userData.gender === 'male' ? `11 - ${this.yearSum}` : `${this.yearSum} + 4`;
      this.kuaRawValue = eval(this.kuaExpression);
      this.kuaValue = Utils.getSumInSingleNumber(this.kuaRawValue as number);
      this.userInfoService.setNumberValueByName(AllTypeOfNumbers.KUA, this.kuaValue);

    }));
    this.subscription.add(this.userInfoService.resetData.subscribe(data => {
      this.resetValue();
    }));
  }
  resetValue() {
    this.kuaValue = undefined;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
