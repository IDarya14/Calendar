import React, { useEffect, useRef, useState } from 'react';
import { Cart } from './Cart';
import { useDispatch, useSelector } from 'react-redux';
import './calendar.scss';
import { useClickOutside } from '../useClickOutSide';

export const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState();
  const ref = useRef();
  const value = useSelector((state) => state.notesReducer.notes);

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
    const x = daysInMonth(D.getFullYear(), D.getMonth());
    const y = new Array(firstDay);
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
      return 'today';
    }
  };

  const addZiro = (num) => {
    if (num < 10) {
      return '0' + num;
    } else return num;
  };

  const checkdate = (num) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const checkday = { day: addZiro(num), month: addZiro(month), year: year };
    setDay(checkday);
  };

  const checkDay = (num) => {
    checkdate(num);
    setOpen(true);
    addNote();
  };

  const addNote = (num) => {
    let result = '';
    value?.find((elem) => {
      if (
        elem.day.day == addZiro(num) &&
        elem.day.month === addZiro(month + 1) &&
        elem.day.year === year
      ) {
        result = elem.notes;
        return elem.notes;
      }
    });

    return result[0];
  };

  useClickOutside(ref, () => setOpen(false), open);

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
        <div className="wrap" ref={ref}>
          {previousDays().map((elem) => {
            return <div className="item item-additional">{elem}</div>;
          })}
          {new Array(daysInMonth()).fill('').map((elem, index) => {
            return (
              <>
                <div
                  className={`${today(index + 1)} item`}
                  onClick={() => checkDay(index + 1)}
                >
                  <div className="item__notes">{addNote(index + 1)}</div>
                  <div className="item__num"> {index + 1}</div>
                </div>
              </>
            );
          })}

          {followingDays().map((elem) => {
            return <div className="item item-additional">{elem}</div>;
          })}
          {open ? (
            <Cart day={day} setOpen={setOpen} date={date} addZiro={addZiro} />
          ) : (
            ''
          )}
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
