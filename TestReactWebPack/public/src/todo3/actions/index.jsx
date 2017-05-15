
export const addToDo = (id, desc) => ({
  type: 'ADD_TODO',
  payload: { id: id, desc: desc },
  error: false
});

export const setVisibiityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  payload: { filter: filter },
  error: false
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  payload: { id: id },
  error: false
});
