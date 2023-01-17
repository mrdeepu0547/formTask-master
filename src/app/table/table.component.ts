import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
 @Input() user=[ ];
 @Output() data: EventEmitter<string[]> = new EventEmitter<string[]>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.user)
  }
  public editId:number;
  onEdit(i:number){
    console.log(this.user[i].firstName)
    this.editId=i;
    console.log(i);
    this.data.emit(this.user[i]);
  }
  onDelete(id:number){
    // this.user.splice(i,1,'')
  //   this.user.forEach((users,i)=>{
  //     this.user.splice(i,1);
  // });
  // console.log(this.user[i])
  // this.user.splice(i,1)
  // console.log(this.user)
  this.user=this.user.filter(item=>item.id!=id)
  console.log(this.user)
  }
}
