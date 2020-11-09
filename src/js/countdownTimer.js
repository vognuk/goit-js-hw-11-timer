export class CountdownTimer {
  constructor({selector, targetDate}) {
    this._selector = selector;
    this._targetDate = targetDate;
    this.refs = {
      days:  document.querySelector(`${selector} [data-value="days"]`),
      hours: document.querySelector(`${selector} [data-value="hours"]`),
      mins:  document.querySelector(`${selector} [data-value="mins"]`),
      secs:  document.querySelector(`${selector} [data-value="secs"]`),
    };
  }

  setTimerDefaultValue() {
    this.refs.days.textContent  = 0;
    this.refs.hours.textContent = 0;
    this.refs.mins.textContent  = 0;
    this.refs.secs.textContent  = 0;
  }

  getTimelinePartials(time) {
    const days  = this.timerView(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.timerView(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins  = this.timerView(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs  = this.timerView(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs};
  }

  timerView(value) {
    return String(value).padStart(2, '00');
  }

  timerInitialization() {
    this.setTimerDefaultValue();

    localStorage.setItem ('timerId', this.intervalId = setInterval(() => {
      const start     = Date.now();
      const deltaTime = this._targetDate - start;
      const time      = this.getTimelinePartials(deltaTime);
      this.setTimerCurrentValue(time);
    }, 1000));
  }

  setTimerCurrentValue({ days, hours, mins, secs }) {
    if (days + hours + mins + secs > 0) {
      this.refs.days.textContent  = days;
      this.refs.hours.textContent = hours;
      this.refs.mins.textContent  = mins;
      this.refs.secs.textContent  = secs;
    } else 
    clearInterval(localStorage.getItem('timerId'));
    
  }
}
