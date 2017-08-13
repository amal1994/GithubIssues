import { Component, OnInit,AfterContentInit} from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import {IssuesService} from '../issues.service';

import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit,AfterContentInit {
    posts=[];
    pageSize=5;
    pagedPosts=[];
    users: User[] = [];
    currentUser=JSON.parse(localStorage.getItem('currentUser'));
    filterValue;   

    constructor(private userService: UserService,private issueService:IssuesService) { }

    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
        
        
    }

    ngAfterContentInit(){
        this.posts = this.issueService.getIssues();
        this.pagedPosts=_.take(this.posts,this.pageSize);
    
    }
    //passing this value as input for issues component
    filterIssues(filterValue){
        this.filterValue=filterValue;
    }
    
    //Handle change page event for pagination
    changePage(currentPage){
        var startingIndex=((currentPage-1)*this.pageSize);
        this.pagedPosts = _.take(_.rest(this.posts,startingIndex),this.pageSize);
    }

}