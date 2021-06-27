import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';

import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { PsychicNumberComponent } from './psychic-number/psychic-number.component';
import { DestinyByDateComponent } from './destiny-by-date/destiny-by-date.component';
import { SoulComponent } from './soul/soul.component';
import { KuaComponent } from './kua/kua.component';
import { LoShuGridComponent } from './lo-shu-grid/lo-shu-grid.component';
import { PlanesOfNumbersComponent } from './planes-of-numbers/planes-of-numbers.component';
import { DestinyByNameComponent } from './destiny-by-name/destiny-by-name.component';
import { PersonalityNumberComponent } from './personality-number/personality-number.component';
import { PrintNumberTemplateComponent } from './print-number-template/print-number-template.component';
import { UltimateRealityComponent } from './ultimate-reality/ultimate-reality.component';
import { PinnaclesNumberComponent } from './pinnacles-number/pinnacles-number.component';
import { ChallengeNumberComponent } from './challenge-number/challenge-number.component';
import { PersonalYearComponent } from './personal-year/personal-year.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserInfoComponent,
    PsychicNumberComponent,
    DestinyByDateComponent,
    SoulComponent,
    KuaComponent,
    LoShuGridComponent,
    PlanesOfNumbersComponent,
    DestinyByNameComponent,
    PersonalityNumberComponent,
    PrintNumberTemplateComponent,
    UltimateRealityComponent,
    PinnaclesNumberComponent,
    ChallengeNumberComponent,
    PersonalYearComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
