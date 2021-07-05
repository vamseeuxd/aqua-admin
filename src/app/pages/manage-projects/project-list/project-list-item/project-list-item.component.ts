import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Project} from '../../manage-projects.component';
import {NbPopoverDirective} from '@nebular/theme';

@Component({
  selector: 'ngx-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss'],
})
export class ProjectListItemComponent implements OnInit {
  @Input() project: Project;
  @Output() deleteProject: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() editProject: EventEmitter<Project> = new EventEmitter<Project>();
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor() {
  }

  ngOnInit(): void {
  }

}
