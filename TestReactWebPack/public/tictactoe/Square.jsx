import React from 'react';

const Square = function (props) {
  const cls = props.win ? 'square light-blue' : 'square';
  return (
    <button className={cls} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
