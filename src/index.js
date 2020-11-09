import './styles.css';
import {CountdownTimer} from './js/countdownTimer';

const timerInstance = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 30, 2021'),
});

document.addEventListener('DOMContentLoaded', timerInstance.timerInitialization.bind(timerInstance));
