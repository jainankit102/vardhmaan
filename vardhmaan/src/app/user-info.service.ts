import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserInfo } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userInfo: Subject<UserInfo> = new Subject<UserInfo>();
  resetData: Subject<UserInfo> = new Subject<UserInfo>();

  private allNumberData: any = {
    destinyByDate: 0,
    destinyByName: 0,
    kuaNumber: 0,
    personalityNumber: 0,
    psychicNumber: 0,
    soulNumber: 0
  }

  setUserInfo(value: UserInfo) {
    this.userInfo.next(value);
  }

  getUserInfo() {
    return this.userInfo.asObservable();
  }

  setNumberValueByName(numType: string, value: number) {
    this.allNumberData[numType] = value;
  }

  getNumberValueByNumName(numType: string) {
    if (this.allNumberData.hasOwnProperty(numType)) {
      return this.allNumberData[numType];
    }
  }



  constructor() { }
}
