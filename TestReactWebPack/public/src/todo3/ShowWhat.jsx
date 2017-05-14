import React from 'react';
import { connect } from 'react-redux';

const Link = ({ filter, onClick, text, option }) => {
  const cls = 'green no-underline underline-hover';
  if (option === filter) {
    return (<span>{text}</span>);
  }

  return (
    <a className={cls} onClick={() => onClick(option)}>{text}</a>
  );
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (filter) => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
      });
    }
  };
};

const LinkItem = connect(mapStateToProps, mapDispatchToProps)(Link);

const ShowWhat = () => (
  <div>Show :&nbsp;
    <LinkItem option={'SHOW_ALL'} text={'All'} />&nbsp;|&nbsp;
    <LinkItem option={'SHOW_OPEN'} text={'Open'} />&nbsp;|&nbsp;
    <LinkItem option={'SHOW_COMPLETED'} text={'Completed'} />
  </div>
);

export default ShowWhat;
