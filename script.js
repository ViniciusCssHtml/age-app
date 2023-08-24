function calculateYars() {
  const day = document.querySelector('#day');
  const month = document.querySelector('#month');
  const year = document.querySelector('#year');
  const btn = document.querySelector('button');
  const resultDay = document.querySelector('#days');
  const resultMonth = document.querySelector('#months');
  const resultYears = document.querySelector('#years');

  btn.addEventListener('click', calculate);

  function calculate(e) {
    e.preventDefault();
    const valueDay = +day.value;
    const valueMonth = +month.value;
    const valueYear = +year.value;
    const date = new Date();

    // verificando o dia
    function validateDay() {
      day.classList.toggle('error', valueDay < 1 || valueDay > 31);
    }

    validateDay();
    // verificando o mês
    function validateMonth() {
      month.classList.toggle('error', valueMonth < 1 || valueMonth > 12);
    }
    validateMonth();
    // verificando o ano
    function validateYear() {
      year.classList.toggle(
        'error',
        valueYear === date.getFullYear() + 1 || valueYear < 1,
      );
    }
    validateYear();
    // verificando a idade
    function calculateDay() {
      const dateNow = date.getDate();
      if (valueDay === 0 || valueDay > 31) {
        return (resultDay.innerText = '--');
      }
      const cal = Math.abs(dateNow - valueDay);
      return (resultDay.innerText = cal);
    }

    calculateDay();

    function calculateMonth() {
      const currentDate = new Date();
      const monthNow = currentDate.getMonth() + 1;

      if (valueMonth === 0 || valueMonth > 12) {
        resultMonth.innerText = '--';
      } else {
        const cal = Math.abs(monthNow - (valueMonth + 1));
        resultMonth.innerText = cal;
      }
    }
    calculateMonth();

    function calculateYear() {
      function isValidDate() {
        return (
          valueDay >= 1 &&
          valueDay <= 31 &&
          valueMonth >= 1 &&
          valueMonth <= 12 &&
          valueYear >= 1 &&
          valueYear <= date.getFullYear() &&
          new Date(valueYear, valueMonth - 1, valueDay).getDate() === valueDay
        );
      }

      if (!isValidDate()) {
        resultDay.innerText = '--';
        resultMonth.innerText = '--';
        resultYears.innerText = '--';
        day.classList.add('error');
        month.classList.add('error');
        year.classList.add('error');
        return;
      }

      const currentDate = new Date();
      const birthDate = new Date(valueYear, valueMonth, valueDay);

      const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
      const isBeforeBirthday =
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate());

      const calculatedAge = isBeforeBirthday ? yearsDiff - 1 : yearsDiff;

      if (calculatedAge < 0 || calculatedAge > 2023) {
        return (resultYears.innerText = '--');
      }

      let currentAge = 0;
      const interval = setInterval(() => {
        if (currentAge <= calculatedAge) {
          resultYears.innerText = currentAge;
          currentAge++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    }

    calculateYear();
  }
}
calculateYars();
