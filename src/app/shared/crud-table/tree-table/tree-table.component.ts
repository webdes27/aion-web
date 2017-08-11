import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {ITreeNode, Column} from '../types/interfaces';

@Component({
  selector: 'tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['../crud-table.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeTableComponent implements OnInit {

  @Input() nodes: ITreeNode[];
  @Input() columns: Column[];
  @Input() public headerHeight: number = 30;
  @Output() onRequestNodes: EventEmitter<ITreeNode> = new EventEmitter();

  offsetX: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  resizeColumn({column, newValue}: any) {
    for (const col of this.columns) {
      if (col.name === column.name) {
        col.width = newValue;
      }
    }
  }

  onBodyScroll(event: any): void {
    const scrollYPos: number = event.scrollYPos;
    const scrollXPos: number = event.scrollXPos;
    this.offsetX = scrollXPos;
  }


}
