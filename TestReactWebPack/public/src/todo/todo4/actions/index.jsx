import fetch from 'isomorphic-fetch';

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

//async...
export const fetchTodosInit = () => ({
  type: 'FETCH_TODOS_INIT',
  error: false
});

export const fetchTodosSuccess = (json) => ({
  type: 'FETCH_TODOS_SUCCESS',
  payload: json,
  error: false
});

export const fetchTodosError = (err) => ({
  type: 'FETCH_TODOS_ERR',
  payload: err,
  error: true
});

export const refreshTodos = () => dispatch => {
  dispatch(fetchTodosInit());
  return fetch('http://localhost:3300/todo/all').then(resp => resp.json())
    .then(json => dispatch(fetchTodosSuccess(json))).catch(err => dispatch(fetchTodosError(err)));
};

// export const refreshTodos = function () {
//   return function (dispatch) {
//     dispatch(fetchTodosInit());
//     return fetch('http://localhost:3300/todo/all').then(resp => resp.json())
//       .then(json => dispatch(fetchTodosSuccess(json)));
//   };
// };

