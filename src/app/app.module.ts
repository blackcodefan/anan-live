import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PhoneSigninComponent } from './phone-signin/phone-signin.component';
import {MatCardModule} from '@angular/material/card';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import { NgOtpInputModule } from 'ng-otp-input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {environment} from '../environments/environment';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {NewMeetingComponent} from './new-meeting/new-meeting.component';
import { JoinComponent } from './join/join.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { RoomComponent } from './room/room.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        MatCardModule,
        NgxIntlTelInputModule,
        AppRoutingModule,
        NgOtpInputModule,
        MatInputModule,
        MatMenuModule,
        MatGridListModule,
        MatIconModule,
        MatFormFieldModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        MatButtonModule
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PhoneSigninComponent,
    HomeComponent,
    NewMeetingComponent,
    JoinComponent,
    ScheduleComponent,
    MeetingsComponent,
    RoomComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
