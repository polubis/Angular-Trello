export class Timer {
  public hourLength = 60;
  public dayLength = 24 * this.hourLength;
  public weekLength = 7 * this.dayLength;
  getTimerFormat(time?: number): string {
    if (time === undefined || time === null) {
      return 'This task is not touched yet';
    }

    if (time === 0) {
      return '1 minute ago';
    }

    const { hourLength, dayLength, weekLength } = this;

    let timeString = '';

    if (time > hourLength) {
      const floorHours = Math.floor(time / hourLength);
      timeString += floorHours.toString() + ' h ';
    }

    const minutes: number = time % hourLength;
    if (minutes !== 0) {
      timeString += minutes.toString() + ' m';
    }

    return timeString;
  }

}
