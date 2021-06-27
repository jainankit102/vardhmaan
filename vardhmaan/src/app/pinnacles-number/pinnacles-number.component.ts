import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DigitInWord, Utils } from '../shared/utils';
import { PinnacleNumberMeta, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-pinnacles-number',
  templateUrl: './pinnacles-number.component.html',
  styleUrls: ['./pinnacles-number.component.scss']
})
export class PinnaclesNumberComponent implements OnInit, OnDestroy {

  listOfPinnaclesNumber: Array<PinnacleNumberMeta> = [];

  firstPinnacleNumber: number | undefined;
  firstPinnaclePeriord: number | undefined;

  secondPinnacleNumber: number | undefined;
  secondPinnaclePeriord: number | undefined;

  thirdPinnacleNumber: number | undefined;
  thirdPinnaclePeriord: number | undefined;

  fourthPinnacleNumber: number | undefined;
  fourthPinnaclePeriord: number | undefined;

  date: number | undefined;
  month: number | undefined;
  year: number | undefined;

  dateSum: number | undefined;
  monthSum: number | undefined;
  yearSum: number | undefined;

  lifePath: number | undefined;

  private subscription = new Subscription();

  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      this.resetValue();
      const dateObj = new Date(userData.dateOfBirth);
      this.updateDateProperties(dateObj);

      this.calculateFirstPinnacle();
      this.calculateSecondPinnacle();
      this.calculateThirdinnacle();
      this.calculateFourthPinnacle();



    }));

    this.subscription.add(this.userInfoService.resetData.subscribe(data => {
      this.resetValue();
    }));
  }

  calculateFirstPinnacle() {
    this.firstPinnacleNumber = Utils.getSumInSingleNumber((this.dateSum as number) + (this.monthSum as number));
    this.firstPinnaclePeriord = 36 - (this.lifePath as number);
    const firstPinnacleObj: PinnacleNumberMeta = {
      title: `1'st Pinnacle number`,
      value: this.firstPinnacleNumber,
      period: `0 to ${36 - (this.lifePath as number)} Years`,
      valueExpression: `${this.dateSum} + ${this.monthSum} = ${(this.dateSum as number) + (this.monthSum as number)}`,
      periodExpression: `36(const) - ${this.lifePath}(Life path)`
    }
    this.listOfPinnaclesNumber.push(firstPinnacleObj);
  }

  calculateSecondPinnacle() {
    this.secondPinnacleNumber = Utils.getSumInSingleNumber((this.dateSum as number) + (this.yearSum as number));
    this.secondPinnaclePeriord = (this.firstPinnaclePeriord as number) + 9;
    const secondPinnacleObj: PinnacleNumberMeta = {
      title: `2'nd Pinnacle number`,
      value: this.secondPinnacleNumber,
      period: `${(this.firstPinnaclePeriord as number) + 1} to ${this.secondPinnaclePeriord} Years`,
      valueExpression: `${this.dateSum} + ${this.yearSum} = ${(this.dateSum as number) + (this.yearSum as number)}`,
      periodExpression: `${this.firstPinnaclePeriord} + 9(Const)`
    }

    this.listOfPinnaclesNumber.push(secondPinnacleObj);
  }

  calculateThirdinnacle() {
    this.thirdPinnacleNumber = Utils.getSumInSingleNumber((this.firstPinnacleNumber as number) + (this.secondPinnacleNumber as number));
    this.thirdPinnaclePeriord = (this.secondPinnaclePeriord as number) + 9;
    const thirdPinnacleObj: PinnacleNumberMeta = {
      title: `3'rd Pinnacle number`,
      value: this.thirdPinnacleNumber,
      period: `${(this.secondPinnaclePeriord as number) + 1} to ${this.thirdPinnaclePeriord} Years`,
      valueExpression: `${this.firstPinnacleNumber} + ${this.secondPinnacleNumber} = ${(this.firstPinnacleNumber as number) + (this.secondPinnacleNumber as number)}`,
      periodExpression: `${this.secondPinnaclePeriord} + 9(Const)`
    }

    this.listOfPinnaclesNumber.push(thirdPinnacleObj);
  }

  calculateFourthPinnacle() {
    this.fourthPinnacleNumber = Utils.getSumInSingleNumber((this.monthSum as number) + (this.yearSum as number));
    // this.fourthPinnaclePeriord = fourthPinnacleObj.period;
    const fourthPinnacleObj: PinnacleNumberMeta = {
      title: `4'th Pinnacle number`,
      value: this.fourthPinnacleNumber,
      period: `${(this.thirdPinnaclePeriord as number) + 1} to Life time`,
      valueExpression: `${this.monthSum} + ${this.yearSum} = ${(this.monthSum as number) + (this.yearSum as number)}`,
      periodExpression: `${this.thirdPinnaclePeriord} - To rest of the life`
    }

    this.listOfPinnaclesNumber.push(fourthPinnacleObj);
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

  resetValue(): void {
    this.listOfPinnaclesNumber = [];
    this.lifePath = undefined;
    this.date = undefined;
    this.dateSum = undefined;
    this.month = undefined;
    this.monthSum = undefined;
    this.year = undefined;
    this.yearSum = undefined;
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}