import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userInfo: any;

  setUserInfo(value: any) {
    this.userInfo = value;
  }

  getUserInfo() {
    return this.userInfo;
  }

  constructor() { }
}
