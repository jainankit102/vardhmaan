import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Utils } from '../shared/utils';
import { AllTypeOfNumbers, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-ultimate-reality',
  templateUrl: './ultimate-reality.component.html',
  styleUrls: ['./ultimate-reality.component.scss']
})
export class UltimateRealityComponent implements OnInit, OnDestroy {

  title = 'Ultimate reality';

  ultimateNumber: number | undefined;

  private subscription = new Subscription();
  destinyByDate: any;
  destinyByName: any;
  ultimateRawNumber: any;

  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      this.destinyByDate = this.userInfoService.getNumberValueByNumName(AllTypeOfNumbers.DESTINY_BY_DOB);
      this.destinyByName = this.userInfoService.getNumberValueByNumName(AllTypeOfNumbers.DESTINY_BY_NAME);
      this.ultimateRawNumber = this.destinyByDate + this.destinyByName;
      this.ultimateNumber = Utils.getSumInSingleNumber(this.ultimateRawNumber)
    }));


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
