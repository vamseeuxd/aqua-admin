import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {Project} from '../manage-projects.component';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {NbDialogService} from '@nebular/theme';
import {BusyIndicatorService} from '../../../services/busy-indicator/busy-indicator.service';
import {NgForm} from '@angular/forms';

export interface Pond {
  id?: string;
  name: string;
}

@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  @Input() projects: Project[] = [];
  @Output() deleteProject: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() editProject: EventEmitter<Project> = new EventEmitter<Project>();

  private pondsCollection: AngularFirestoreCollection<Pond>;
  ponds$: Observable<Pond[]>;
  ponds: Pond[] = [];
  private pondsSubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private dialogService: NbDialogService,
    public busyIndicator: BusyIndicatorService,
  ) {
    this.pondsCollection = afs.collection<Pond>('ponds');
    this.ponds$ = this.pondsCollection.valueChanges({idField: 'id'});
    const busyID = this.busyIndicator.show();
    this.pondsSubscription = this.ponds$.subscribe(value => {
      this.ponds = value;
      this.busyIndicator.hide(busyID);
    });
  }

  async addItem(addProjectForm: NgForm, ref) {
    const busyID = this.busyIndicator.show();
    await this.pondsCollection.add(addProjectForm.value);
    addProjectForm.resetForm({});
    ref.close();
    this.busyIndicator.hide(busyID);
  }

  openDialog(dialog: TemplateRef<any>, project: Project) {
    this.dialogService.open(
      dialog,
      {
        context: project,
        hasBackdrop: false,
        autoFocus: true,
      });
  }

}
