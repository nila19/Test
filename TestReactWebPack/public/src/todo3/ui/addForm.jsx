import React from 'react';

const addForm2 = ({ onAdd }) => {
  let input;
  let id = 1;
  return (
    <div className="box">
      <div className="columns">
        <div className="column is-9">
          <div className="field">
            <div className="control">
              <input className="input" type="text" ref={node => { input = node }} />
            </div>
          </div>
        </div>
        <div className="column is-3">
          <a className="button is-primary" onClick={() => {
            onAdd(id, input.value);
            id += 1;
            input.value = '';
          }}>Add</a>
        </div>
      </div>
    </div>
  )
};

export default addForm2;
