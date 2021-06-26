import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Utils } from '../shared/utils';
import { UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';


@Component({
  selector: 'app-personal-year',
  templateUrl: './personal-year.component.html',
  styleUrls: ['./personal-year.component.scss']
})
export class PersonalYearComponent implements OnInit, OnDestroy {


  date: number | undefined;
  month: number | undefined;
  year: number | undefined;

  dateSum: number | undefined;
  monthSum: number | undefined;
  yearSum: number | undefined;

  lifePath: number | undefined;

  todaysDate = new Date();
  todayYear = this.todaysDate.getFullYear();
  todayYearSum = Utils.getSumInSingleNumber(this.todayYear);
  todayMonth = this.todaysDate.getMonth() + 1;
  todayMonthValue = Utils.getSumInSingleNumber(this.todayMonth);

  personalYearNumber: number | undefined;
  personalYearExpression: string | undefined;

  personalMonthNumber: number | undefined;
  personalMonthExpression: string | undefined;

  private subscription = new Subscription();

  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      const dateObj = new Date(userData.dateOfBirth);
      this.updateDateProperties(dateObj);
      this.personalYearExpression = `${this.dateSum} + ${this.monthSum} + ${this.todayYearSum} = ${(this.dateSum as number) + (this.monthSum as number) + this.todayYearSum}`
      this.personalYearNumber = Utils.getSumInSingleNumber((this.dateSum as number) + (this.monthSum as number) + this.todayYearSum);

      this.personalMonthNumber = Utils.getSumInSingleNumber(this.personalYearNumber + this.todayMonthValue);
      this.personalMonthExpression = `${this.personalYearNumber} + ${this.todayMonthValue} = ${this.personalYearNumber + this.todayMonthValue}`;
    }));
  }

  updateDateProperties(dateObj: Date) {
    this.date = dateObj.getDate();
    this.dateSum = Utils.getSumInSingleNumber(this.date);

    this.month = dateObj.getMonth() + 1;
    this.monthSum = Utils.getSumInSingleNumber(this.month);

    this.year = dateObj.getFullYear();
    this.yearSum = Utils.getSumInSingleNumber(this.year);

    this.lifePath = Utils.getSumInSingleNumber(this.dateSum + this.monthSum + this.yearSum);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
