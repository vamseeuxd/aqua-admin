import {Component, OnInit} from '@angular/core';
import {Project} from '../manage-projects.component';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {Pond} from '../project-list/project-list.component';
import {NbDialogService} from '@nebular/theme';
import {BusyIndicatorService} from '../../../services/busy-indicator/busy-indicator.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';


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
          return ref.where('projectId', '==', projectID);
        }).valueChanges();
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
      return this.afs.doc<Project>('projects/' + projectID).valueChanges();
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

}
