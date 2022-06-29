import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-meeting',
    templateUrl: './new-meeting.component.html',
    styleUrls: ['./new-meeting.component.scss']
})
export class NewMeetingComponent implements OnInit {

    idControl = new FormControl(undefined, [Validators.required]);
    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.idControl.setValue(Date.now());
    }

    createMeeting(): void {
        if (this.idControl.valid) {
            this.router.navigateByUrl(`/room/${this.idControl.value}`);
        }
    }
}
