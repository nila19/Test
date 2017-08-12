import React from 'react';
import { connect } from 'react-redux';

import { refreshTodos } from '../actions/index.jsx';

const mapStateToProps = (state) => {
  return {
    spinner: state.spinner
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRefreshClick: () => {
      dispatch(refreshTodos());
    }
  };
};

const RefreshItem = ({ spinner, onRefreshClick }) => {
  const cls = 'button is-primary ' + (spinner.on ? 'is-loading' : '');
  return (
    <div>
      <a className={cls} onClick={onRefreshClick}>Refresh</a>{' '}
      <span className="message is-danger">
        <div className="message-body">{spinner.msg}</div>
      </span>
    </div>
  )
};

const Refresh = connect(mapStateToProps, mapDispatchToProps)(RefreshItem);
export default Refresh;
