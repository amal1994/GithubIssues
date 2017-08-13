import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {IssuesService} from '../issues.service';
import {Issue,Comment,Log} from '../issue';
@Component({
  selector: 'app-show-issue',
  templateUrl: './show-issue.component.html',
  styleUrls: ['./show-issue.component.css']
})
export class ShowIssueComponent implements OnInit {
  commentForm: FormGroup;
  currentIssueId;
  currentIssue=new Issue();
  currentUser;
  currentIssueLogs;
  constructor(private fb:FormBuilder,
  private _activatedRouter : ActivatedRoute,
  private issueService:IssuesService) { 
    this.createForm();
    
  }

  ngOnInit() {
    document.body.style.backgroundColor="#fff";
    this._activatedRouter.params.subscribe(params => {
      this.currentIssueId= +params["id"];
      this.currentIssue = this.issueService.getIssueById(this.currentIssueId);
    })
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  //form logic for creating comment
  createForm() {
    this.commentForm = this.fb.group({ // <-- the parent FormGroup
        issueComment: ['',Validators.required ]
    });
  }


  //function to push comment to issue's comments 
  pushComment(){
    var commentCreatedDate=new Date().toDateString().substr(4,15);
    var commentCreatedTime=new Date().toTimeString().substr(0,5);
    var commentContent = this.commentForm.controls['issueComment'].value;
    this.issueService.addComment(this.currentIssueId,this.currentUser,commentContent,commentCreatedDate,commentCreatedTime);
    this.commentForm.reset();

  }
  
  //function to close issue on issue timeline
  closeIssue(){
    var logCreatedDate=new Date().toDateString().substr(4,15);
    var logCreatedTime=new Date().toTimeString().substr(0,5);
    this.issueService.closeIssue(this.currentIssueId,this.currentUser,logCreatedDate,logCreatedTime);
    this.commentForm.reset();
  }

  //function to reopen a closed issue on issue timeline
  reopenIssue(){
    var logCreatedDate=new Date().toDateString().substr(4,15);
    var logCreatedTime=new Date().toTimeString().substr(0,5);
    this.issueService.reopenIssue(this.currentIssueId,this.currentUser,logCreatedDate,logCreatedTime);
    this.currentIssueLogs = this.issueService.getIssueLogs(this.currentIssueId);
    this.commentForm.reset();
  }
  
  //checking if the inserted timeline object is a Comment or a Log
  IfInstanceOfComment(timelineItem){
    if(timelineItem instanceof Comment){
      return true;
    }
    else{
      return false;
    }
  }
 
}
