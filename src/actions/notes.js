export const addNote = (note) => ({
  type: 'ADD_NOTE',
  payload: note,
});

export const deleteNote = (note) => ({
  type: 'DELETE_NOTE',
  payload: note,
});
