import React from 'react';

class SortToggle extends React.Component {
  render() {
    return (
      <div>
        <div className="flex items-center mb2">
          <input className="mr2" type="checkbox" defaultChecked={this.props.sortAsc}
            onClick={() => this.props.onClick()} /> Sort Asc ?
        </div>
      </div>
    );
  }
}

export default SortToggle;
