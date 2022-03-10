import React, { useState } from 'react';
import './calendar.scss';

export const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = () => {
    return 32 - new Date(year, month, 32).getDate();
  };
  const daysInmonth = daysInMonth();

  const lastDay = (daysInmonth) => {
    const n = new Date(year, month, daysInmonth).getDay() + 1;
    return 7 - n;
  };

  const previousDays = () => {
    const D = new Date(date);
    D.setMonth(D.getMonth() - 1);
    const x = daysInMonth(D.getFullYear(), D.getMonth()); // кол-во дней в предыдущем месяце 28
    const y = new Array(firstDay); // массив с кол-вом элементов перед месяцем 2
    const arr = [];
    for (let i = 0; i < y.length; i++) {
      arr.push(x - i);
    }
    arr.reverse();
    return arr;
  };

  const followingDays = () => {
    const y = new Array(lastDay(daysInmonth));
    const arr = [];
    for (let i = 0; i < y.length; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  const nextBtn = () => {
    const D = new Date(date);
    D.setMonth(D.getMonth() + 1);
    return setDate(D);
  };

  const backBtn = () => {
    const D = new Date(date);
    D.setMonth(D.getMonth() - 1);
    return setDate(D);
  };

  const now = () => {
    setDate(new Date());
  };

  const allmonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const today = (day) => {
    if (
      year === new Date().getFullYear() &&
      month === new Date().getMonth() &&
      day === new Date().getDate()
    ) {
      console.log(day);
      return 'today';
    }
  };

  return (
    <div className="calendar">
      <div className="calendar__wrapper">
        <div className="header">
          <div className="header__month">{allmonth[month]}</div>
          <div className="header__year">{`${year} year`}</div>
          <div></div>
          <div></div>
          <div></div>
          <div className="header__btnnext" onClick={() => nextBtn()}>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25223.png" />
          </div>
          <div className="header__btnback" onClick={() => backBtn()}>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25223.png" />
          </div>
        </div>
        <div className="body">
          <div className="body__date">Sun</div>
          <div className="body__date">Mon</div>
          <div className="body__date">Tues</div>
          <div className="body__date">Wed</div>
          <div className="body__date">Thu</div>
          <div className="body__date">Fri</div>
          <div className="body__date">Sat</div>
        </div>
        <div className="wrap">
          {previousDays().map((elem) => {
            return <div className="item item-additional">{elem}</div>;
          })}
          {new Array(daysInMonth()).fill('').map((elem, index) => {
            return (
              <div className={`${today(index + 1)} item`}>{index + 1}</div>
            );
          })}
          {followingDays().map((elem) => {
            return <div className="item item-additional">{elem}</div>;
          })}
        </div>
        <div className="now">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="now__item" onClick={() => now()}>
            Now
          </div>
        </div>
      </div>
    </div>
  );
};
