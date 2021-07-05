import {Component, TemplateRef} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {BusyIndicatorService} from '../../services/busy-indicator/busy-indicator.service';
import {NbDialogService} from '@nebular/theme';
import {NgForm} from '@angular/forms';
import firebase from 'firebase';

export interface Project {
  id?: string;
  name: string;
  address: string;
  deleted: boolean;
}

@Component({
  selector: 'ngx-manage-projects',
  styleUrls: ['./manage-projects.component.scss'],
  templateUrl: './manage-projects.component.html',
})
export class ManageProjectsComponent {
  private projectsCollection: AngularFirestoreCollection<Project>;
  projects$: Observable<Project[]>;
  projects: Project[] = [];
  private projectsSubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private dialogService: NbDialogService,
    public busyIndicator: BusyIndicatorService,
  ) {
    this.projectsCollection = afs.collection<Project>('projects', ref => {
      return ref.where('deleted', '==', false)
        .orderBy('createdOn', 'desc');
    });
    this.projects$ = this.projectsCollection.valueChanges({idField: 'id'});
    const busyID = this.busyIndicator.show();
    this.projectsSubscription = this.projects$.subscribe(value => {
      this.projects = value;
      this.busyIndicator.hide(busyID);
    });
  }

  async addItem(addProjectForm: NgForm, ref, project: Project = null) {
    const busyID = this.busyIndicator.show();
    if (project) {
      await this.projectsCollection.doc(project.id).update(
        {
          ...addProjectForm.value,
          createdOn: firebase.firestore.Timestamp.now().seconds,
          modifiedOn: firebase.firestore.Timestamp.now().seconds,
        },
      );
    } else {
      await this.projectsCollection.add({
        ...addProjectForm.value, deleted: false,
        createdOn: firebase.firestore.Timestamp.now().seconds,
        modifiedOn: firebase.firestore.Timestamp.now().seconds,
      });
    }
    addProjectForm.resetForm({});
    ref.close();
    this.busyIndicator.hide(busyID);
  }

  async deleteItem(project: Project) {
    if (project.id) {
      if (confirm('Are you sure? Do you want to delete the Project')) {
        const busyID = this.busyIndicator.show();
        await this.projectsCollection.doc(project.id).update({deleted: true});
        this.busyIndicator.hide(busyID);
      }
    }
  }

  openDialog(dialog: TemplateRef<any>, projectToEdit: Project = null) {
    this.dialogService.open(
      dialog,
      {
        context: projectToEdit,
        hasBackdrop: true,
        closeOnBackdropClick: false,
        autoFocus: true,
      });
  }

}
