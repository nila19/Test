
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        desc: action.desc,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  console.log('TODOs :: ' + JSON.stringify(state) + ' : ' + JSON.stringify(action));
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

export default todos;
