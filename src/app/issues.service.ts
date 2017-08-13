import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import {Issue,Comment,Log} from './issue';

var issues=[];
let id =0;

@Injectable()
export class IssuesService {

  constructor() { }
  //adding issue to issues list
  addIssue(issue:Issue){
    issues.push(issue);
  }
  removeIssue(id){
    
  }

  //adding comment to Comment List
  addComment(issueId,commentAuthor,commentContent,commentCreatedDate,commentCreatedTime){
    var issue = issues.filter(x=> x.id === issueId)[0];
    var userComment = new Comment();
    userComment.commentAuthor=commentAuthor;
    userComment.commentContent=commentContent;
    userComment.commentCreatedDate=commentCreatedDate;
    userComment.commentCreatedTime=commentCreatedTime;
    issue.comments.push(userComment);
    this.addToIssueTimeline(issueId,userComment);
    
  }
  //getting issues list
  getIssues(){
    return issues;
  }

  //get current issue id
  getCurrentId(){
    return id;
  }

  updateId(){
    id++;
  }

  //get issue with specific id
  getIssueById(id){
    return issues.filter(x => x.id === id)[0];
  }
  //getting list of open issues
  getOpenIssues(){
    var openIssues=0;
    issues.forEach(function(value,index){
      if(value.status==='open'){
        openIssues++;
      }
    })

    return openIssues;
  }

  //getting list of closed issues
  getClosedIssues(){
    var closedIssues=0;
    issues.forEach(function(value,index){
      if(value.status==='closed'){
        closedIssues++;
      }
    })

    return closedIssues;
  }

  getTotalIssues(){
    return issues.length;
  }

  //get logs related to specific issue
  getIssueLogs(issueId){
    var issue = issues.filter(x=> x.id === issueId)[0];
    if(issue!=null)
    return issue.logs.length;
  }
  
  //closing issue on issue timeline
  closeIssue(issueId,logAuthor,logCreatedDate,logCreatedTime){
    var issue = issues.filter(x=> x.id === issueId)[0];
    var log = new Log();
    issue.status="closed";
    log.logStatus="closed";
    log.logAuthor=logAuthor;
    log.logCreatedDate=logCreatedDate;
    log.logCreatedTime=logCreatedTime;
    issue.logs.push(log);
    this.addToIssueTimeline(issueId,log);
   
  }

  //reopening issue on issue timeline
  reopenIssue(issueId,logAuthor,logCreatedDate,logCreatedTime){
    var issue = issues.filter(x=> x.id === issueId)[0];
    var log = new Log();
    issue.status="open";
    log.logStatus="open";
    log.logAuthor=logAuthor;
    log.logCreatedDate=logCreatedDate;
    log.logCreatedTime=logCreatedTime;
    issue.logs.push(log);
    this.addToIssueTimeline(issueId,log);
  }
 
  //adding timeline object to timeline of an issue 
  addToIssueTimeline(issueId,timelineItem){
    var issue = issues.filter(x=> x.id === issueId)[0];
   
    issue.timeline.push(timelineItem);
    
  }
}
