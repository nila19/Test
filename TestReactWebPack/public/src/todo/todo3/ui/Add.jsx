import React from 'react';

const Add = ({ seq, onAdd }) => {
  let input;

  const submitAdd = (e) => {
    e.preventDefault();
    onAdd(seq, input.value);
    input.value = '';
    input.focus();
  };

  return (
    <div className="box">
      <form onSubmit={submitAdd} >
        <div className="columns">
          <div className="column is-9">
            <div className="field">
              <div className="control">
                <input className="input" type="text" ref={node => { input = node }} />
              </div>
            </div>
          </div>
          <div className="column is-3">
            <a className="button is-primary" onClick={submitAdd}>Add</a>
          </div>
        </div>
      </form>
    </div >
  )
};

export default Add;
