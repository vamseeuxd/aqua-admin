import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NbPopoverDirective} from '@nebular/theme';
import {Pond} from '../../project-list/project-list.component';

@Component({
  selector: 'ngx-ponds-list-item',
  templateUrl: './ponds-list-item.component.html',
  styleUrls: ['./ponds-list-item.component.scss'],
})
export class PondsListItemComponent implements OnInit {

  @Input() pond: Pond;
  @Output() deletePond: EventEmitter<Pond> = new EventEmitter<Pond>();
  @Output() editPond: EventEmitter<Pond> = new EventEmitter<Pond>();
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor() {
  }

  ngOnInit(): void {
  }

}
