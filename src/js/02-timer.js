// Задание 2 - таймер обратного отсчета
// Выполняй это задание в файлах 02-timer.html и 02-timer.js. Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. Такой таймер может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д. Посмотри демо видео работы таймера.

// Элементы интефрейса
// В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при клике по которой таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.

// <input type="text" id="datetime-picker" />
// <button type="button" data-start>Start</button>

// <div class="timer">
//   <div class="field">
//     <span class="value" data-days>00</span>
//     <span class="label">Days</span>
//   </div>
//   <div class="field">
//     <span class="value" data-hours>00</span>
//     <span class="label">Hours</span>
//   </div>
//   <div class="field">
//     <span class="value" data-minutes>00</span>
//     <span class="label">Minutes</span>
//   </div>
//   <div class="field">
//     <span class="value" data-seconds>00</span>
//     <span class="label">Seconds</span>
//   </div>
// </div>
// Библиотека flatpickr
// Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса. Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме того который описан в документации.

// // Описан в документации
// import flatpickr from "flatpickr";
// // Дополнительный импорт стилей
// import "flatpickr/dist/flatpickr.min.css";
// Библиотека ожидает что её инициализируют на элементе input[type="text"], поэтому мы добавили в HTML документ поле input#datetime-picker.

// <input type="text" id="datetime-picker" />
// Вторым аргументом функции flatpickr(selector, options) можно передать необязательный объект параметров. Мы подготовили для тебя объект который нужен для выполнения задания. Разберись за что отвечает каждое свойство в документации «Options» и используй его в своем коде.

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };
// Выбор даты
// Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.

// Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
// Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
// Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
// При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
// Отсчет времени
// При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.

// Количество дней может состоять из более чем двух цифр.
// Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
// НЕ БУДЕМ УСЛОЖНЯТЬ
// Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу.

// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
// Форматирование времени
// Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. Обрати внимание, что она не форматирует результат. То есть, если осталось 4 минуты или любой другой составляющей времени, то функция вернет 4, а не 04. В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов. Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.

// Библиотека уведомлений
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

let selectedTime = null;
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.timerID = null;
    this.isActive = false;
    refs.startBtn.disabled = true;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.timerID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const componentsTimer = convertMs(deltaTime);
      this.updateComponentsTimer(componentsTimer);
      if (deltaTime <= 0 || deltaTime <= 1000) {
        this.stopTimer();
      }
    }, 1000);
  }

  updateComponentsTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }

  stopTimer() {
    clearInterval(this.timerID);
  }
}

const timer = new Timer();
flatpickr(refs.inputDate, options);
refs.startBtn.addEventListener('click', () => timer.startTimer());
