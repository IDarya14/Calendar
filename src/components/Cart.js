import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../actions/notes';
import { deleteNote } from '../actions/notes';
import './cart.scss';

export const Cart = ({ day, setOpen, date, addZiro }) => {
  const [notes, setNotes] = useState();
  const dispatch = useDispatch();
  const value = useSelector((state) => state.notesReducer.notes);

  const noteList = () => {
    let result = {};
    value?.find((elem) => {
      if (
        elem.day.day === day.day &&
        elem.day.month === addZiro(date.getMonth() + 1) &&
        elem.day.year === date.getFullYear()
      ) {
        result = elem;
        return elem;
      }
    });
    return result.notes;
  };

  const hendlerClick = () => {
    dispatch(addNote({ notes: notes, day: day }));
    setNotes('');
  };

  const deleteBtn = (e, index) => {
    e.stopPropagation();
    const res = noteList();
    const arr = [...res];
    arr.splice(index, 1);
    dispatch(deleteNote({ notes: arr, day: day }));
  };

  return (
    <div className="cart-wrapper">
      <div className="cart">
        <div className="cart__closewrapper">
          <div className="cart__close" onClick={() => setOpen(false)}>
            &#10006;
          </div>
          <div>
            {day.day}.{day.month}.{day.year}
          </div>
          <div></div>
        </div>
        <ul className="list">
          {noteList()
            ? noteList().map((elem, index) => {
                return (
                  <li className="list__wrapper">
                    <div
                      className="list__delete"
                      onClick={(e) => deleteBtn(e, index)}
                    >
                      &#10006;
                    </div>
                    <div className="list__elem">{elem}</div>
                  </li>
                );
              })
            : ''}
        </ul>
        <div className="input">
          <div className="input__text">Добавить заметку</div>
          <div className="input__items">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="input__btn" onClick={() => hendlerClick()}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
