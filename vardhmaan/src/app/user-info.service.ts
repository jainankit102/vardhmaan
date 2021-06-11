import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserInfo } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userInfo: Subject<UserInfo> = new Subject<UserInfo>();



  setUserInfo(value: UserInfo) {
    this.userInfo.next(value);
  }

  getUserInfo() {
    return this.userInfo.asObservable();
  }

  constructor() { }
}
