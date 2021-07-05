import {Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService, NbPopoverDirective} from '@nebular/theme';
import {Sensor} from '../sensors-list.component';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BusyIndicatorService} from '../../../../services/busy-indicator/busy-indicator.service';
import {combineLatest, Observable, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import firebase from 'firebase';

@Component({
  selector: 'ngx-sensors-list-item',
  templateUrl: './sensors-list-item.component.html',
  styleUrls: ['./sensors-list-item.component.scss'],
})
export class SensorsListItemComponent implements OnInit {

  pondID$ = new Subject<string>();
  projectID$ = new Subject<string>();
  tableName$ = new Subject<string>();
  pondID = '';
  projectID = '';
  @HostBinding('class') cssClassName = 'd-block w-100';
  @Input() sensor: Sensor;
  @Output() editSensor: EventEmitter<Sensor> = new EventEmitter<Sensor>();
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  sensors$: Observable<any[]> = combineLatest([this.pondID$, this.projectID$, this.tableName$])
    .pipe(switchMap(
      (value: string[]) => {
        const [pondID, projectID, tableName] = value;
        return this.afs.collection<any>(tableName, ref => {
          return ref
            .where('pondId', '==', pondID)
            .where('projectId', '==', projectID)
            .where('deleted', '==', false)
            .orderBy('createdOn', 'desc');
        }).valueChanges({idField: 'id'});
      },
    ));
  private sensorsCollection: AngularFirestoreCollection<any>;
  sensors = [];

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private dialogService: NbDialogService,
    public busyIndicator: BusyIndicatorService,
  ) {
  }

  ngOnInit(): void {
    if (this.sensor && this.sensor.tableName) {
      this.sensors$.subscribe((data) => {
        this.sensors = data;
      });
      this.sensorsCollection = this.afs.collection<Sensor>(this.sensor.tableName);
      this.route.params.subscribe(value => {
        this.projectID$.next(value['projectID']);
        this.pondID$.next(value['pondID']);
        this.tableName$.next(this.sensor.tableName);
        this.pondID = value['pondID'];
        this.projectID = value['projectID'];
      });
    }
  }

  async deleteSensor(sensor: any) {
    if (sensor.id) {
      if (confirm('Are you sure? Do you want to delete "' + sensor.name)) {
        const busyID = this.busyIndicator.show();
        await this.sensorsCollection.doc(sensor.id).update({deleted: true});
        this.busyIndicator.hide(busyID);
      }
    }
  }

  openDialog(addPondTemplateRef: TemplateRef<any>, sensorToEdit: Sensor = null) {
    this.dialogService.open(
      addPondTemplateRef,
      {
        context: sensorToEdit,
        hasBackdrop: true,
        closeOnBackdropClick: false,
        autoFocus: true,
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
      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(startDate.getFullYear() + 1);
      await this.sensorsCollection.add(
        {
          ...addSensorForm.value, deleted: false,
          warrantyFrom: startDate.getTime(),
          warrantyTo: endDate.getTime(),
          createdOn: firebase.firestore.Timestamp.now().seconds,
          modifiedOn: firebase.firestore.Timestamp.now().seconds,
        });
    }
    addSensorForm.resetForm({});
    ref.close();
    this.busyIndicator.hide(busyID);
  }

  createServiceRequest() {
    prompt('Please provide contact Mobile Number');
    const busyID = this.busyIndicator.show();
    setTimeout(() => {
      alert('Service request created successfully, you will get a call from one of our executive');
    }, 2000);
    setTimeout(() => {
      this.busyIndicator.hide(busyID);
    }, 1000);
  }
}
