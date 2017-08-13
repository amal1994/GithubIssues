import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';
import {Comment,Issue} from '../issue';
import {IssuesService} from '../issues.service';
@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {
  today=Date.now();
  issueForm: FormGroup;
  currentUser;
  constructor(private fb:FormBuilder,
  private issueService:IssuesService,
  private _router:Router
  ) { 
    this.createForm();
  }

  ngOnInit() {
    document.body.style.backgroundColor="#fff";
    //get current logged in user from local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
 
  //Model driven form for creating an issue with validation
  createForm() {
    this.issueForm = this.fb.group({ // <-- the parent FormGroup
        issueTitle: ['', Validators.required ],
        issueContent: ['',Validators.required ],
        currentDate:['']
    });
  }

  //function to create an isssue with it's timeline after user submits the create issue form
  onSubmit(){
    //Initialising issue object
    var newIssue = new Issue();

    //getting current date and time
    var currentDate = new Date().toDateString().substr(4,15);
    var currentTime =  new Date().toTimeString().substr(0,5);
    
    //Setting issue values
    newIssue.author = this.currentUser.username;
    newIssue.id = this.issueService.getCurrentId();
    newIssue.id=newIssue.id +1;
    this.issueService.updateId();
    newIssue.title=this.issueForm.controls['issueTitle'].value;
    
    
    //Initialising issue timeline,comments and logs
    newIssue.comments=[];
    newIssue.logs=[];
    newIssue.timeline=[];
    
    //Pushing the issue into issue list
    newIssue.createdDate=currentDate;
    newIssue.createdTime=currentTime;
    newIssue.status='open';
    this.issueService.addIssue(newIssue);

    //Pushing issue content as comment
    this.issueService.addComment( newIssue.id,this.currentUser.username,
                      this.issueForm.controls['issueContent'].value,currentDate,currentTime);

    // ps-In the above scenario, we could subscribe to the services but
    //   since the flow is linear and we know that it's bound to happen,
    //   Hence handled it synchronously 


    //Navigating to Issue list Page after successfull entry
    this._router.navigate(['']);
  }
}
