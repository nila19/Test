import { connect } from 'react-redux';

import Add from '../ui/Add.jsx';
import { addToDo } from '../actions/index.jsx';

const mapStateToProps = (state) => {
  return {
    seq: state.seq || 1
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (id, desc) => {
      dispatch(addToDo(id, desc));
    }
  };
};

const AddForm = connect(mapStateToProps, mapDispatchToProps)(Add);
export default AddForm;
