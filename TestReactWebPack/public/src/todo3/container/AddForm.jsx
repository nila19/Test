import { connect } from 'react-redux';

import addForm from '../ui/addForm.jsx';

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (id, desc) => {
      dispatch({
        type: 'ADD_TODO',
        id: id,
        desc: desc,
        completed: false
      });
    }
  };
};

const AddForm = connect(null, mapDispatchToProps)(addForm);

export default AddForm;
