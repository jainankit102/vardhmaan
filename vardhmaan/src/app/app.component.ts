import { Component } from '@angular/core';
import { UserInfo } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vardhmaan';
  isFormSubmitted = false;
  isReset = false;
  formSubmissionHandler(event: UserInfo) {
    this.isFormSubmitted = true;
  }

  formResetHandler(event: UserInfo) {
    this.isReset = true;
  }
}
