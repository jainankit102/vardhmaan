import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utils } from '../shared/utils';
import { PinnacleNumberMeta, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-challenge-number',
  templateUrl: './challenge-number.component.html',
  styleUrls: ['./challenge-number.component.scss']
})
export class ChallengeNumberComponent implements OnInit, OnDestroy {

  listOfChallengeNumber: Array<PinnacleNumberMeta> = [];

  firstChallengeNumber: number | undefined;
  firstChallengePeriord: number | undefined;

  secondChallengeNumber: number | undefined;
  secondChallengePeriord: number | undefined;

  thirdChallengeNumber: number | undefined;
  thirdChallengePeriord: number | undefined;

  fourthChallengeNumber: number | undefined;
  fourthChallengePeriord: number | undefined;

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

      this.calculateFirstChallenge();
      this.calculateSecondChallenge();
      this.calculateThirdinnacle();
      this.calculateFourthChallenge();



    }));
  }

  calculateFirstChallenge() {
    this.firstChallengeNumber = Math.abs(Utils.getSumInSingleNumber((this.dateSum as number) - (this.monthSum as number)));
    this.firstChallengePeriord = 36 - (this.lifePath as number);
    const firstChallengeObj: PinnacleNumberMeta = {
      title: `1'st Challenge number`,
      value: this.firstChallengeNumber,
      period: `0 to ${36 - (this.lifePath as number)} Years`,
      valueExpression: `${this.dateSum} - ${this.monthSum} = ${Math.abs((this.dateSum as number) - (this.monthSum as number))}`,
      periodExpression: `36(const) - ${this.lifePath}(Life path)`
    }
    this.listOfChallengeNumber.push(firstChallengeObj);
  }

  calculateSecondChallenge() {
    this.secondChallengeNumber = Math.abs(Utils.getSumInSingleNumber((this.dateSum as number) - (this.yearSum as number)));
    this.secondChallengePeriord = (this.firstChallengePeriord as number) + 9;
    const secondChallengeObj: PinnacleNumberMeta = {
      title: `2'nd Challenge number`,
      value: this.secondChallengeNumber,
      period: `${(this.firstChallengePeriord as number) + 1} to ${this.secondChallengePeriord} Years`,
      valueExpression: `${this.dateSum} - ${this.yearSum} = ${Math.abs((this.dateSum as number) - (this.yearSum as number))}`,
      periodExpression: `${this.firstChallengePeriord} + 9(Const)`
    }

    this.listOfChallengeNumber.push(secondChallengeObj);
  }

  calculateThirdinnacle() {
    this.thirdChallengeNumber = Math.abs(Utils.getSumInSingleNumber((this.firstChallengeNumber as number) - (this.secondChallengeNumber as number)));
    this.thirdChallengePeriord = (this.secondChallengePeriord as number) + 9;
    const thirdChallengeObj: PinnacleNumberMeta = {
      title: `3'rd Challenge number`,
      value: this.thirdChallengeNumber,
      period: `${(this.secondChallengePeriord as number) + 1} to ${this.thirdChallengePeriord} Years`,
      valueExpression: `${this.firstChallengeNumber} - ${this.secondChallengeNumber} = ${Math.abs((this.firstChallengeNumber as number) - (this.secondChallengeNumber as number))}`,
      periodExpression: `${this.secondChallengePeriord} + 9(Const)`
    }

    this.listOfChallengeNumber.push(thirdChallengeObj);
  }

  calculateFourthChallenge() {
    this.fourthChallengeNumber = Math.abs(Utils.getSumInSingleNumber((this.monthSum as number) - (this.yearSum as number)));
    // this.fourthChallengePeriord = fourthChallengeObj.period;
    const fourthChallengeObj: PinnacleNumberMeta = {
      title: `4'th Challenge number`,
      value: this.fourthChallengeNumber,
      period: `${(this.thirdChallengePeriord as number) + 1} to Life time`,
      valueExpression: `${this.monthSum} - ${this.yearSum} = ${Math.abs((this.monthSum as number) + (this.yearSum as number))}`,
      periodExpression: `${this.thirdChallengePeriord} - To rest of the life`
    }

    this.listOfChallengeNumber.push(fourthChallengeObj);
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
    this.listOfChallengeNumber = [];
    // this.firstNameNumber = '';
    // this.fullName = '';
    // this.lastNameNumber = '';
    // this.fullNameNumber = '';
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}