import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils';
import {SeoService} from './@core/utils';
import {SwUpdate} from '@angular/service-worker';
import {BusyIndicatorService} from './services/busy-indicator/busy-indicator.service';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private swUpdate: SwUpdate,
    public busyIndicator: BusyIndicatorService,
    private seoService: SeoService,
  ) {
  }

  async updateSoftware() {
    await this.swUpdate.activateUpdate();
    window.location.reload();
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    this.swUpdate.available.subscribe(async (res) => {
      alert('Software Update available!');
      this.updateSoftware();
      /* const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload()); */
    });
  }
}
