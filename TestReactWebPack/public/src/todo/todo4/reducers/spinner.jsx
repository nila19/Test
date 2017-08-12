
const spinner = (state = { on: false, msg: '' }, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_INIT':
      return { on: true, msg: '' };
    case 'FETCH_TODOS_SUCCESS':
      // console.log('Async completed 3....');
      return { on: false, msg: '' };
    case 'FETCH_TODOS_ERR':
      return { on: false, msg: 'Async errored..' };
    default:
      return state;
  }
};

export default spinner;
