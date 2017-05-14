import React from 'react';

class AddForm extends React.Component {
  render() {
    return (
      <div className="box">
        <div className="columns">
          <div className="column is-9">
            <div className="field">
              <div className="control">
                <input className="input" type="text" value={this.props.newTodo} onChange={this.props.onNewChange} />
              </div>
            </div>
          </div>
          <div className="column is-3">
            <a className="button is-primary" onClick={this.props.onAdd}>Add</a>
          </div>
        </div>
      </div>
    );
  }
}

export default AddForm;
