import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-psychic-number',
  templateUrl: './psychic-number.component.html',
  styleUrls: ['./psychic-number.component.scss']
})
export class PsychicNumberComponent implements OnInit {

  constructor(private userInfoService: UserInfoService) { }

  value: number | undefined;

  ngOnInit(): void {
    const userInfo = this.userInfoService.getUserInfo();
    const date: Date = new Date(userInfo.dateOfBirth);
    this.value = date.getDate().toString().split('').map(Number).reduce((acc, curr) => acc + curr, 0);
  }

}
