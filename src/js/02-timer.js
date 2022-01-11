import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector("[data-start]");
const timerFaceDays = document.querySelector("[data-days]");
const timerFaceHours = document.querySelector("[data-hours]");
const timerFaceMinutes = document.querySelector("[data-minutes]");
const timerFaceSeconds = document.querySelector("[data-seconds]");

let selectedDatesEl = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDatesEl = selectedDates[0];
        
        if (selectedDatesEl > Date.now()) {
            startBtnEl.disabled = false;
        } else {
            Notify.warning("Please choose a date in the future");
        }
  },
};
const inputDateEl = flatpickr("#datetime-picker", options);

startBtnEl.addEventListener("click", onStartBtnElClick);
startBtnEl.disabled = true;

function onStartBtnElClick(e) {
    setInterval(() => {
        const startTime = Date.now();
        const timer = selectedDatesEl - startTime;
        const formatingTime = convertMs(timer);

        updateTimerFace(formatingTime);
    }, 1000);

    e.currentTarget.disabled = true;
};

function updateTimerFace({ days, hours, minutes, seconds }) {
    timerFaceDays.textContent = days;
    timerFaceHours.textContent = hours;
    timerFaceMinutes.textContent = minutes;
    timerFaceSeconds.textContent = seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
