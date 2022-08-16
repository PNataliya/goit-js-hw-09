// Задание 3 - генератор промисов
// Выполняй это задание в файлах 03-promises.html и 03-promises.js. Посмотри демо видео работы генератора промисов.

// В HTML есть разметка формы, в поля которой пользователь будет вводить первую задержку в миллисекундах, шаг увеличения задержки для каждого промиса после первого и количество промисов которое необходимо создать.

// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз, сколько ввели в поле amount. При каждом вызове передай ей номер создаваемого промиса (position) и задержку учитывая введенную пользователем первую задержку (delay) и шаг (step).

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
// Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или отклоняется через delay времени. Значением промиса должен быть объект, в котором будут свойства position и delay со значениями одноименных параметров. Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
// Библиотека уведомлений
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Для отображения уведомлений пользователю вместо console.log() используй библиотеку notiflix.

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
let delay = document.querySelector('input[name="delay"]');
let step = document.querySelector('input[name="step"]');
let amount = document.querySelector('input[name="amount"]');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  delay = Number(e.currentTarget.delay.value);
  step = Number(e.currentTarget.step.value);
  amount = Number(e.currentTarget.amount.value);

  if (delay >= 0 && step >= 0 && amount > 0) {
    for (let position = 1; position <= amount; position += 1) {
      delay += step;
      createPromise(position, delay)
        .then(({ position, delay }) => {
          setTimeout(() => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
              useIcon: false,
            });
          }, delay);
        })
        .catch(({ position, delay }) => {
          setTimeout(() => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
              useIcon: false,
            });
          }, delay);
        });
    }
  } else {
    Notify.warning('Put value > 0');
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(objectPromise);
    }
    reject(objectPromise);
  });
}
