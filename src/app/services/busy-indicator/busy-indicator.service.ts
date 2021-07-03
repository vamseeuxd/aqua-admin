import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusyIndicatorService {
  private busyIndicatorsList: number[] = [];

  show(): number {
    const indicatorId = new Date().getTime();
    setTimeout(() => {
      this.busyIndicatorsList.push(indicatorId);
    });
    return indicatorId;
  }

  hide(busyIndicatorId: number): void {
    this.busyIndicatorsList = this.busyIndicatorsList
      .filter((id) => id !== busyIndicatorId);
  }

  isBusyIndicator(): boolean {
    return this.busyIndicatorsList.length > 0;
  }
}
