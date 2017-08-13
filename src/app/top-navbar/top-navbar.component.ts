import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index'; 
@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  users: User[] = [];
  
  //getting logged user from local storage with fake jwt token
  currentUser=JSON.parse(localStorage.getItem('currentUser'));
  isDropdownOpen=false;

  constructor() { }

  ngOnInit() {
    
  }

  //function to toggle dropdown on click
    toggleDropdown(){
        this.isDropdownOpen=!this.isDropdownOpen;
    }

}
