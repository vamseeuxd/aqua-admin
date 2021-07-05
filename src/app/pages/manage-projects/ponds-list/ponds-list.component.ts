import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../manage-projects.component';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {Pond} from '../project-list/project-list.component';
import {NbDialogService} from '@nebular/theme';
import {BusyIndicatorService} from '../../../services/busy-indicator/busy-indicator.service';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'ngx-ponds-list',
  templateUrl: './ponds-list.component.html',
  styleUrls: ['./ponds-list.component.scss'],
})
export class PondsListComponent implements OnInit {

  projectID$ = new Subject<string>();

  private _project: Project;
  get project(): Project {
    return this._project;
  }

  @Input() set project(value: Project) {
    this._project = value;
    this.projectID$.next(value ? value.id : null);
  }

  private pondsCollection: AngularFirestoreCollection<Pond>;
  ponds$: Observable<Pond[]> = this.projectID$.pipe(
    switchMap(projectID => {
      if (projectID) {
        return this.afs.collection<Pond>('ponds', ref => {
          return ref.where('projectId', '==', projectID);
        }).valueChanges();
      } else {
        return EMPTY;
      }
    }),
  );
  ponds: Pond[] = [];
  private pondsSubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private dialogService: NbDialogService,
    public busyIndicator: BusyIndicatorService,
  ) {
    const busyID = this.busyIndicator.show();
    this.pondsSubscription = this.ponds$.subscribe(value => {
      this.ponds = value;
      this.busyIndicator.hide(busyID);
    });
  }

  ngOnInit(): void {
  }

}
