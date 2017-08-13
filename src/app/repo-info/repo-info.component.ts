import { Component, OnInit } from '@angular/core';
import {IssuesService} from '../issues.service';


@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.css']
})
export class RepoInfoComponent implements OnInit {
  totalIssues;
  constructor(private issueService:IssuesService) { }

  ngOnInit() {
    //getting number of issues
    this.totalIssues = this.issueService.getTotalIssues();
  }

}
