import { Component, OnInit,OnChanges,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() items=<any>[];

  //restricting maximum number of results per page
  @Input() pageSize;
  //output for changing page on pagination
  @Output('page-changed') pageChanged = new EventEmitter();

  pagination=false;
  currentPage=1;
  private pages=[];

    ngOnInit(){

    }

    ngOnChanges(){
        if(this.items){
            if(this.items.length>this.pageSize){
                this.pages=[];
                this.pagination=true;
                for(var i=1;i<=Math.ceil(this.items.length/this.pageSize);i++){
                    this.pages.push(i);
                }
            }
            else{
                this.pagination=false;
            }
        }
        
    }
    //emitting page change event 
    changePage(page){
        this.currentPage=page;
        this.pageChanged.emit(this.currentPage);
    }
    //next page logic
    next(){
        if(this.currentPage==this.pages.length){
            return;
        }
        else{
            this.currentPage++;
            this.pageChanged.emit(this.currentPage);
        }
    }
    
    //previous page logic
    previous(){
        if(this.currentPage==1){
            return;
        }
        else{
            this.currentPage--;
            this.pageChanged.emit(this.currentPage);
        }
    }

}
