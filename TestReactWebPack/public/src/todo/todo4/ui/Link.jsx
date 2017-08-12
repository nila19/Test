import React from 'react';

const Link = ({ filter, onClick, text, option }) => {
  const cls = 'green no-underline underline-hover';
  if (option === filter) {
    return (<span>{text}</span>);
  }
  return (
    <a className={cls} onClick={() => onClick(option)}>{text}</a>
  );
}

export default Link;
