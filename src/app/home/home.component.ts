import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  noMeeting = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

      const email = localStorage.getItem('email');
      const name = localStorage.getItem('name');
      console.log(email, name);
      if (!email || !name) {
          this.router.navigateByUrl('/signin');
      }
  }

}
