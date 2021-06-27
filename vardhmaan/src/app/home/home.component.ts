import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  isFormSubmitted = false;
  isReset = false;
  constructor() { }

  ngOnInit(): void {
  }
  formSubmissionHandler(event: UserInfo) {
    this.isFormSubmitted = true;
  }

  formResetHandler(event: UserInfo) {
    this.isReset = true;
  }

}
