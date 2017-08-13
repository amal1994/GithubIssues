import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {IssuesService} from '../issues.service';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.css']
})
export class FilterSectionComponent implements OnInit {
  items: string[];
  @Output('filter-item') filterItem = new EventEmitter();
  constructor(private issueService:IssuesService) { }

  ngOnInit() {
    this.items = this.issueService.getIssues();
  }
  
  //emitting filter value to be used by issues component
  filterValue(filterItem){
    this.filterItem.emit(filterItem);
  }

}
