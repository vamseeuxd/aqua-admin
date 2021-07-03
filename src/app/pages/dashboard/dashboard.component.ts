import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';

interface CardSettings {
  title: string;
  value: string;
  subTitle?: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  solarValue: number;
  liveWaterPH: CardSettings = {subTitle:'Level: 7.5pH to 8.5pH', value: '06.50 pH', title: 'PH',iconClass: 'fa fa-spinner',type: 'danger',};
  liveWaterORP: CardSettings = {subTitle:'Level: 3 NTU - 5 NTU', value: '4 NTU', title: 'ORP' ,iconClass: 'fa fa-fire',type: 'success',};
  liveWaterTurbidity: CardSettings = {subTitle:'Level: 3 NTU - 5 NTU', value: '4 NTU', title: 'Turbidity',iconClass: 'fa fa-tint',type: 'success',};
  liveWaterTemperature: CardSettings = {subTitle:'Level: 25°C - 40°C', value: '30 °C', title: 'Temperature',iconClass: 'fa fa-thermometer-empty',type: 'success',};
  liveWaterHumidity: CardSettings = {subTitle:'Level: 20 g.kg - 50 g.kg', value: '30 g.kg', title: 'Humidity',iconClass: 'fa fa-shower',type: 'success',};
  liveWaterConductivity: CardSettings = {subTitle:'Level: 5 S/m - 10 S/m', value: '7 S/m', title: 'Conductivity',iconClass: 'fa fa-code-branch',type: 'success',};
  liveWaterAmmonia: CardSettings = {subTitle:'Level: 2 mg/l - 12 mg/l', value: '10 mg/l', title: 'Ammonia',iconClass: 'fa fa-dna',type: 'success',};
  liveWaterNitricOxide: CardSettings = {subTitle:'Level: 7iNO - 14iNO', value: '13 iNO', title: 'Nitric Oxide',iconClass: 'fa fa-burn',type: 'success',};
  liveWaterDo: CardSettings = {subTitle:'Level: 80% - 120%', value: '100 %', title: 'DO',  iconClass: 'fa fa-heartbeat',type: 'success',};
  liveWeather: CardSettings = {value: '32°C°F', title: 'Current weather',  iconClass: 'fa fa-cloud',type: 'success',};

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.liveWaterPH,
    this.liveWaterTurbidity,
    this.liveWaterTemperature,
    this.liveWaterHumidity,
    this.liveWaterORP,
    this.liveWaterConductivity,
    this.liveWaterAmmonia,
    this.liveWaterNitricOxide,
    this.liveWaterDo,
    this.liveWeather,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.liveWaterPH,
        type: 'primary',
      },
      {
        ...this.liveWaterTurbidity,
        type: 'primary',
      },
      {
        ...this.liveWaterTemperature,
        type: 'primary',
      },
      {
        ...this.liveWaterHumidity,
        type: 'primary',
      },
      {
        ...this.liveWaterORP,
        type: 'primary',
      },
      {
        ...this.liveWaterConductivity,
        type: 'primary',
      },
      {
        ...this.liveWaterAmmonia,
        type: 'primary',
      },
      {
        ...this.liveWaterNitricOxide,
        type: 'primary',
      },
      {
        ...this.liveWaterDo,
        type: 'primary',
      },
      {
        ...this.liveWeather,
        type: 'primary',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
