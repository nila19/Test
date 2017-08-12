import { connect } from 'react-redux';

import Link from '../ui/Link.jsx';
import { setVisibiityFilter } from '../actions/index.jsx';

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (filter) => {
      dispatch(setVisibiityFilter(filter));
    }
  };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);
export default FilterLink;
