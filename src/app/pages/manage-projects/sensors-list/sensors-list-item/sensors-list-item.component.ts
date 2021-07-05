import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NbPopoverDirective} from '@nebular/theme';
import {Sensor} from '../sensors-list.component';

@Component({
  selector: 'ngx-sensors-list-item',
  templateUrl: './sensors-list-item.component.html',
  styleUrls: ['./sensors-list-item.component.scss'],
})
export class SensorsListItemComponent implements OnInit {

  @Input() sensor: Sensor;
  @Output() deleteSensor: EventEmitter<Sensor> = new EventEmitter<Sensor>();
  @Output() editSensor: EventEmitter<Sensor> = new EventEmitter<Sensor>();
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor() {
  }

  ngOnInit(): void {
  }

}
