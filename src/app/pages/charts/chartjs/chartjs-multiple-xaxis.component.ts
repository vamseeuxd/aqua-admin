import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";

@Component({
  selector: "ngx-chartjs-multiple-xaxis",
  template: ` <chart type="line" [data]="data" [options]="options"></chart> `,
})
export class ChartjsMultipleXaxisComponent implements OnDestroy {
  data: {};
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      const today = new Date();
      const past1 = new Date();
      past1.setDate(today.getDate() - 1);
      const past2 = new Date();
      past2.setDate(today.getDate() - 2);
      const past3 = new Date();
      past3.setDate(today.getDate() - 3);
      const past4 = new Date();
      past4.setDate(today.getDate() - 4);
      const labels = [
        past4.toDateString(),
        past3.toDateString(),
        past2.toDateString(),
        past1.toDateString(),
        today.toDateString(),
      ];

      setInterval(() => {
        this.data = {
          labels,
          datasets: [
            {
              label: "Aerator 1",
              data: [
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
              ],
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              fill: false,
              borderDash: [5, 5],
              pointRadius: 8,
              pointHoverRadius: 10,
            },
            {
              label: "Aerator 2",
              data: [
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
              ],
              borderColor: colors.dangerLight,
              backgroundColor: colors.dangerLight,
              fill: false,
              borderDash: [5, 5],
              pointRadius: 8,
              pointHoverRadius: 10,
            },
            {
              label: "Aerator 3",
              data: [
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
              ],
              borderColor: colors.info,
              backgroundColor: colors.info,
              fill: false,
              pointRadius: 8,
              pointHoverRadius: 10,
            },
            {
              label: "Tube Lights",
              data: [
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
              ],
              borderColor: colors.success,
              backgroundColor: colors.success,
              fill: false,
              pointRadius: 8,
              pointHoverRadius: 10,
            },
          ],
        };

        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: "bottom",
            labels: {
              fontColor: chartjs.textColor,
            },
          },
          hover: {
            mode: "index",
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Equipments",
                },
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Power (KW)",
                },
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      }, 10000);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
