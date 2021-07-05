import { ChartsModule } from '../charts/charts.module';
import { NgModule } from '@angular/core';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbInputModule,
    NbPopoverModule,
    NbBadgeModule,
    NbContextMenuModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { ManageProjectsComponent } from './manage-projects.component';
import { FormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { PondsListComponent } from './ponds-list/ponds-list.component';
import { ProjectListItemComponent } from './project-list/project-list-item/project-list-item.component';
import {RouterModule} from '@angular/router';
import { PondsListItemComponent } from './ponds-list/ponds-list-item/ponds-list-item.component';
import { SensorsListComponent } from './sensors-list/sensors-list.component';
import { SensorsListItemComponent } from './sensors-list/sensors-list-item/sensors-list-item.component';

@NgModule({
    imports: [
        FormsModule,
        ThemeModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule,
        NbButtonModule,
        NgxEchartsModule,
        ChartsModule,
        NbAccordionModule,
        NbCheckboxModule,
        NbInputModule,
        NbPopoverModule,
        NbBadgeModule,
        RouterModule,
        NbContextMenuModule,
    ],
  declarations: [
    ManageProjectsComponent,
    ProjectListComponent,
    PondsListComponent,
    ProjectListItemComponent,
    PondsListItemComponent,
    SensorsListComponent,
    SensorsListItemComponent,
  ],
})
export class ManageProjectsModule { }
