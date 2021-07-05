import {Component, OnInit, TemplateRef} from '@angular/core';
import {Project} from '../manage-projects.component';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {Pond} from '../project-list/project-list.component';
import {NbDialogService} from '@nebular/theme';
import {BusyIndicatorService} from '../../../services/busy-indicator/busy-indicator.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import firebase from 'firebase';


@Component({
  selector: 'ngx-ponds-list',
  templateUrl: './ponds-list.component.html',
  styleUrls: ['./ponds-list.component.scss'],
})
export class PondsListComponent implements OnInit {

  projectID$ = new Subject<string>();
  private pondsCollection: AngularFirestoreCollection<Pond>;
  ponds$: Observable<Pond[]> = this.projectID$.pipe(
    switchMap(projectID => {
      if (projectID) {
        return this.afs.collection<Pond>('ponds', ref => {
          return ref.where('projectId', '==', projectID)
            .where('deleted', '==', false)
            .orderBy('createdOn', 'desc');
        }).valueChanges({idField: 'id'});
      } else {
        return EMPTY;
      }
    }),
  );
  ponds: Pond[] = [];
  private pondsSubscription: Subscription;
  private projectSubscription: Subscription;

  project$: Observable<Project> = this.projectID$.pipe(switchMap(projectID => {
    if (projectID) {
      return this.afs.doc<Project>('projects/' + projectID).valueChanges({idField: 'id'});
    } else {
      return EMPTY;
    }
  }));

  project: Project;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private dialogService: NbDialogService,
    public busyIndicator: BusyIndicatorService,
  ) {
    this.pondsCollection = this.afs.collection<Pond>('ponds');
    const busyID_0 = this.busyIndicator.show();
    this.pondsSubscription = this.ponds$.subscribe(value => {
      this.ponds = value;
      this.busyIndicator.hide(busyID_0);
    });
    const busyID_1 = this.busyIndicator.show();
    this.projectSubscription = this.project$.subscribe(value => {
      this.project = value;
      this.busyIndicator.hide(busyID_1);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.projectID$.next(value['projectID']);
    });
  }

  async addItem(addPondForm: NgForm, ref: any, pond: any) {
    const busyID = this.busyIndicator.show();
    if (pond) {
      await this.pondsCollection.doc(pond.id).update(
        {
          ...addPondForm.value,
          modifiedOn: firebase.firestore.Timestamp.now().seconds,
        },
      );
    } else {
      await this.pondsCollection.add(
        {
          ...addPondForm.value, deleted: false,
          createdOn: firebase.firestore.Timestamp.now().seconds,
          modifiedOn: firebase.firestore.Timestamp.now().seconds,
        });
    }
    addPondForm.resetForm({});
    ref.close();
    this.busyIndicator.hide(busyID);
  }

  async deleteItem(pond: Pond) {
    if (pond.id) {
      if (confirm('Are you sure? Do you want to delete "' + pond.name + '" from "' + this.project.name + '"')) {
        const busyID = this.busyIndicator.show();
        await this.pondsCollection.doc(pond.id).update({deleted: true});
        this.busyIndicator.hide(busyID);
      }
    }
  }

  openDialog(addPondTemplateRef: TemplateRef<any>, pondToEdit: Pond = null) {
    this.dialogService.open(
      addPondTemplateRef,
      {
        context: pondToEdit,
        hasBackdrop: true,
        closeOnBackdropClick: false,
        autoFocus: true,
      });
  }
}
