import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Utils } from '../shared/utils';
import { AllTypeOfNumbers, PrintTemplateMeta, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-destiny-by-date',
  templateUrl: './destiny-by-date.component.html',
  styleUrls: ['./destiny-by-date.component.scss']
})
export class DestinyByDateComponent implements OnInit, OnDestroy {

  title = 'Destiny By Date';

  destinyRawCalculation: string | undefined;
  destinyValue: number | undefined;
  destiyRawValue: number | undefined;

  private subscription = new Subscription();

  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      const dateObject: Date = new Date(userData.dateOfBirth);
      const dateRawString = `${dateObject.getDate()}${dateObject.getMonth() + 1}${dateObject.getFullYear()}`;
      this.destinyRawCalculation = dateRawString.split('').join(' + ');
      this.destiyRawValue = eval(this.destinyRawCalculation);
      this.destinyValue = Utils.getSumInSingleNumber(dateRawString, true);

      this.userInfoService.setNumberValueByName(AllTypeOfNumbers.DESTINY_BY_DOB, this.destinyValue);

    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
