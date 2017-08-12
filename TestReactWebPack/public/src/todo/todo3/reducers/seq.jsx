
const seq = (state = 1, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state + 1;
    default:
      return state;
  }
};

export default seq;
