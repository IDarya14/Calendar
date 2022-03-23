const initState = {
  notes: [],
};

export default (state = initState, action) => {
  if (action.payload?.day === state.notes?.day) {
  }

  switch (action.type) {
    case 'ADD_NOTE':
      const index = state.notes.findIndex((elem) => {
        return (
          elem.day.day === action.payload?.day.day &&
          elem.day.month === action.payload?.day.month &&
          elem.day.year === action.payload?.day.year
        );
      });
      if (index === -1) {
        let arr = [];
        arr.push(action.payload.notes);
        return {
          ...state,
          notes: [...state.notes, { notes: arr, day: action.payload.day }],
        };
      } else {
        let notesArr = [...state.notes];
        let arr = [...notesArr[index].notes];
        arr.push(action.payload.notes);
        notesArr[index] = {
          ...notesArr[index],
          notes: arr,
        };
        return {
          ...state,
          notes: notesArr,
        };
      }
    case 'DELETE_NOTE':
      const i = state.notes.findIndex((elem) => {
        return (
          elem.day.day === action.payload?.day.day &&
          elem.day.month === action.payload?.day.month &&
          elem.day.year === action.payload?.day.year
        );
      });
      let notesArr = [...state.notes];
      let arr = [...notesArr[i].notes];
      arr = action.payload.notes;
      notesArr[i] = {
        ...notesArr[i],
        notes: arr,
        day: action.payload?.day,
      };

      return {
        ...state,
        notes: notesArr,
      };
    default:
      return state;
  }
};
