import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonSet extends Component {

  state = { update: false}

  addCard = evt =>{
    this.setState({ update:  true  })
    this.props.update(true);
    const numbers = JSON.parse(localStorage.getItem("numbers"));
    const columnsId =JSON.parse(localStorage.getItem("columnId"));
    const storedcolumnsId = Array.from(columnsId);
    if (localStorage.getItem("columnId")==="[]") {
      localStorage.setItem("numbers", ("["+ numbers + "," + [numbers.length+1] +"]"));
    }
    if (localStorage.getItem("columnId")!=="[]") {
      if (numbers.length===0) {
        let add = storedcolumnsId.shift();
        localStorage.setItem("numbers", ("["+  add +"]"));
        localStorage.setItem("columnId", ("[" + storedcolumnsId + "]"));
      }
      else {
        let add = storedcolumnsId.shift();
        localStorage.setItem("numbers", ("["+ numbers + "," + add +"]"));
        localStorage.setItem("columnId", ("[" + storedcolumnsId + "]"));
      }
    }
  }
  
  render() {
    return (
      <div >
        <button className="btn btn-secondary ml-2 op mt-2 wth" onClick={this.addCard}>
          Add Column +
        </button>
      </div>
    );
  }
}

ButtonSet.propTypes = {
  update: PropTypes.func
};
export default ButtonSet;
