import React from 'react';

class ShowWhat extends React.Component {
  render() {
    return (
      <div>Show :&nbsp;
        <Link filter={this.props.filter} onClick={this.props.onClick} option={'SHOW_ALL'} text={'All'} />&nbsp;|&nbsp;
        <Link filter={this.props.filter} onClick={this.props.onClick} option={'SHOW_OPEN'} text={'Open'} />&nbsp;|&nbsp;
        <Link filter={this.props.filter} onClick={this.props.onClick} option={'SHOW_COMPLETED'} text={'Completed'} />
      </div>
    );
  }
}

const Link = ({ filter, text, option, onClick }) => {
  const cls = 'green no-underline underline-hover';

  if (option === filter) {
    return (<span>{text}</span>);
  }

  return (
    <a className={cls} onClick={() => onClick(option)}>{text}</a>
  );
}

export default ShowWhat;
