// Задание 1 - переключатель цветов
// Выполняй это задание в файлах 01-color-switcher.html и 01-color-switcher.js. Посмотри демо видео работы переключателя.

// В HTML есть кнопки «Start» и «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>
// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function updateBodyBGcolor(color) {
  document.body.style.backgroundColor = color;
}

class ColorSwitcher {
  constructor(updateBodyBGcolor) {
    this.intervalID = null;
    this.isActive = false;
    this.updateBodyBGcolor = updateBodyBGcolor;
    stopBtn.disabled = true;
  }

  startChangeBGcolor() {
    if (this.isActive) {
      return;
    }

    startBtn.disabled = true;
    stopBtn.disabled = false;

    this.isActive = true;
    this.intervalID = setInterval(
      () => updateBodyBGcolor(getRandomHexColor()),
      1000
    );
  }

  stopChangeBGcolor() {
    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(this.intervalID);
    this.isActive = false;
  }
}

const colorSwitcher = new ColorSwitcher();

startBtn.addEventListener('click', () => colorSwitcher.startChangeBGcolor());
stopBtn.addEventListener('click', () => colorSwitcher.stopChangeBGcolor());
