import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

    idControl = new FormControl(undefined, [Validators.required]);
    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    joinMeeting(): void {
        if (this.idControl.valid) {
            this.router.navigateByUrl(`/room/${this.idControl.value}`);
        }
    }

}
