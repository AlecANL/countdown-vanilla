const form = document.getElementById('form');
const countdown = document.getElementById('countdown');
const modal = document.getElementById('modal');
const datePicker = document.getElementById('datepicker');
const messageText = document.getElementById('message-text');
const $day = document.getElementById('day'),
  $hours = document.getElementById('hours'),
  $seconds = document.getElementById('seconds'),
  $minutes = document.getElementById('minutes');

function getCurrentDate() {
  const date = new Date();
  return {
    currentYear: date.getFullYear(),
    currentMonth: date.getMonth() + 1,
    currentDay: date.getDate(),
    now: date,
  };
}

function validSetDate(date) {
  const { currentDay, currentMonth, currentYear } = getCurrentDate();
  const { format_day, format_month, format_year } = formatterDate(date);

  //   console.log(year, +for, +format_day);

  if (
    +format_year < currentYear ||
    +format_month < currentMonth ||
    +format_day <= currentDay
  ) {
    handleMessage(messageText, 'Please enter a valid Date.');
    return;
  }

  const timer = setInterval(() => {
    const countDown = buildCountDown(date);
    populateCountDown(countDown);
  }, 1000);
  modal.classList.remove('is-active');
  countdown.style.display = 'flex';
}

function populateCountDown({ days, hours, seconds, minutes }) {
  $day.textContent = days;
  $hours.textContent = hours;
  $seconds.textContent = seconds;
  $minutes.textContent = minutes;
}

function handleMessage(el, message) {
  el.parentElement.classList.add('is-active');
  el.textContent = message;
  setTimeout(() => {
    el.parentElement.classList.remove('is-active');
  }, 1000);
}

function validDatePicker(date) {
  if (!date) {
    handleMessage(messageText, 'Plese enter a valid date.');
    return;
  }
  const { date: deadlineDate } = formatterDate(date);
  validSetDate(deadlineDate);
}

function formatterDate(date) {
  const dateUsed = `${date}T00:00:00.00`;
  const dateSplited = dateUsed.split('-');
  const getDay = dateSplited[dateSplited.length - 1].split('T');
  return {
    format_year: dateSplited[0],
    format_month: dateSplited[1],
    format_day: getDay[0],
    date: dateUsed,
  };
}

function handleSubmitForm(e) {
  e.preventDefault();
  const pickerValue = datePicker.value;
  validDatePicker(pickerValue);
}

function buildCountDown(deadline) {
  const { now } = getCurrentDate(deadline);
  const spaceByDates = new Date(deadline) - now;

  const days = '' + Math.floor(spaceByDates / (1000 * 60 * 60 * 24));
  const hours = (
    '0' +
    Math.floor((spaceByDates % (1000 * 60 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).slice(-2);
  const minutes = (
    '0' + Math.floor((spaceByDates % (1000 * 60 * 60)) / (1000 * 60))
  ).slice(-2);
  const seconds = ('0' + Math.floor((spaceByDates % (1000 * 60)) / 1000)).slice(
    -2
  );

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

form.addEventListener('submit', handleSubmitForm);
