
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.payload.id,
        desc: action.payload.desc,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.payload.id) {
        return state;
      }
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  console.log('TODOs :: ' + state.length + ' : ' + JSON.stringify(action));
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(null, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

export default todos;
