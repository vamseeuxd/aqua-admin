import {Component, OnInit, TemplateRef} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {BusyIndicatorService} from '../../../services/busy-indicator/busy-indicator.service';
import {NgForm} from '@angular/forms';
import firebase from 'firebase';
import {Pond} from '../project-list/project-list.component';
import {Project} from '../manage-projects.component';

export interface Sensor {
  id?: string;
  deleted?: boolean;
  name: string;
  priority?: number;
  type?: string;
  tableName?: string;
}

@Component({
  selector: 'ngx-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.scss'],
})
export class SensorsListComponent implements OnInit {

  pondID$ = new Subject<string>();
  projectID$ = new Subject<string>();
  private sensorsCollection: AngularFirestoreCollection<Sensor>;
  sensors$: Observable<Sensor[]> = this.pondID$.pipe(
    switchMap(pondID => {
      if (pondID) {
        return this.afs.collection<Sensor>('sensors', ref => {
          return ref.where('deleted', '==', false)
            .orderBy('priority', 'asc');
        }).valueChanges({idField: 'id'});
      } else {
        return EMPTY;
      }
    }),
  );
  sensors: Sensor[] = [];
  sensorsGroupByTypes: any = {};
  sensorTypes: { id: string, name: string }[] = [];
  private pondIDSubscription: Subscription;
  private pondSubscription: Subscription;
  private projectSubscription: Subscription;

  pond$: Observable<Pond> = this.pondID$.pipe(switchMap(pondID => {
    if (pondID) {
      return this.afs.doc<Pond>('ponds/' + pondID).valueChanges({idField: 'id'});
    } else {
      return EMPTY;
    }
  }));

  project$: Observable<Project> = this.projectID$.pipe(switchMap(projectID => {
    if (projectID) {
      return this.afs.doc<Project>('projects/' + projectID).valueChanges({idField: 'id'});
    } else {
      return EMPTY;
    }
  }));

  pond: Pond;
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private dialogService: NbDialogService,
    public busyIndicator: BusyIndicatorService,
  ) {
    this.sensorsCollection = this.afs.collection<Sensor>('sensors');
    const busyID_3 = this.busyIndicator.show();
    this.afs.collection<{ id: string; name: string }>(
      'sensorsTypes',
      ref => {
        return ref.orderBy('priority', 'asc');
      },
    )
      .valueChanges({idField: 'id'}).subscribe(value => {
      this.sensorTypes = value;
      this.busyIndicator.hide(busyID_3);
    });
    const busyID_0 = this.busyIndicator.show();
    this.pondIDSubscription = this.sensors$.subscribe(value => {
      this.sensors = value;
      const groupBy = (xs, key) => {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      this.sensorsGroupByTypes = groupBy(value, 'type');
      this.busyIndicator.hide(busyID_0);
    });
    const busyID_1 = this.busyIndicator.show();
    this.pondSubscription = this.pond$.subscribe(value => {
      this.pond = value;
      this.busyIndicator.hide(busyID_1);
    });
    const busyID_2 = this.busyIndicator.show();
    this.projectSubscription = this.project$.subscribe(value => {
      this.project = value;
      this.busyIndicator.hide(busyID_2);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.projectID$.next(value['projectID']);
      this.pondID$.next(value['pondID']);
    });
  }

  async addItem(addSensorForm: NgForm, ref: any, sensor: any) {
    const busyID = this.busyIndicator.show();
    if (sensor) {
      await this.sensorsCollection.doc(sensor.id).update(
        {
          ...addSensorForm.value,
          modifiedOn: firebase.firestore.Timestamp.now().seconds,
        },
      );
    } else {
      await this.sensorsCollection.add(
        {
          ...addSensorForm.value, deleted: false,
          createdOn: firebase.firestore.Timestamp.now().seconds,
          modifiedOn: firebase.firestore.Timestamp.now().seconds,
        });
    }
    addSensorForm.resetForm({});
    ref.close();
    this.busyIndicator.hide(busyID);
  }


  async deleteSensor(pond: Sensor) {
    if (pond.id) {
      if (confirm('Are you sure? Do you want to delete "' + pond.name + '" from "' + this.pond.name + '"')) {
        const busyID = this.busyIndicator.show();
        await this.sensorsCollection.doc(pond.id).update({deleted: true});
        this.busyIndicator.hide(busyID);
      }
    }
  }

  openDialog(addPondTemplateRef: TemplateRef<any>, pondToEdit: Sensor = null) {
    this.dialogService.open(
      addPondTemplateRef,
      {
        context: pondToEdit,
        hasBackdrop: true,
        closeOnBackdropClick: false,
        autoFocus: true,
      });
  }

  toCamelCase(string: string) {
    if (string && string.trim().length) {
      return string.replace(/\s+(.)/g, function (match, group) {
        return group.toUpperCase();
      });
    } else {
      return '';
    }
  }

}
