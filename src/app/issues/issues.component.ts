import { Component, OnInit,Input } from '@angular/core';
import {IssuesService} from '../issues.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  listOfIssues;
  listOfOpenIssues;
  listOfClosedIssues;
  @Input() filterValue;
  @Input() issues;
  constructor(private issuesService:IssuesService) { }

  ngOnInit() {
    document.body.style.backgroundColor="#fff";
    this.listOfIssues =  this.issuesService.getIssues();
    this.listOfOpenIssues = this.issuesService.getOpenIssues();
    this.listOfClosedIssues = this.issuesService.getClosedIssues();
  }

}
