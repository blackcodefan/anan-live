import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {PhoneSigninComponent} from './phone-signin/phone-signin.component';
import {HomeComponent} from './home/home.component';
import {NewMeetingComponent} from './new-meeting/new-meeting.component';
import {JoinComponent} from './join/join.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {MeetingsComponent} from './meetings/meetings.component';
import {RoomComponent} from './room/room.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'signin',
        component: PhoneSigninComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'new-meeting',
        component: NewMeetingComponent
    },
    {
        path: 'join-meeting',
        component: JoinComponent
    },
    {
        path: 'schedule-meeting',
        component: ScheduleComponent
    },
    {
        path: 'meeting-list',
        component: MeetingsComponent
    },
    {
        path: 'room/:id',
        component: RoomComponent
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
        }]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
