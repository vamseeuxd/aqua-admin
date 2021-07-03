import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <!-- <nb-card (click)="on = !on" [ngClass]="{'off': !on}"> -->
    <nb-card [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ value }}</div>
        <div  class="h6 font-weight-normal text-secondary">{{title}}</div>
        <div class="text-primary p font-weight-normal m-0 p-0">{{ subTitle }}</div>
        <!-- <div class="status paragraph-2">{{ on ? 'ON' : 'OFF' }}</div> -->
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() value: string;
  @Input() subTitle: string;
  @Input() type: string;
  @Input() on = true;
}
