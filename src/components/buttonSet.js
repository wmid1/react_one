import React, { Component } from 'react';

class ButtonSet extends Component {
  state = { update: false,}
  addCard = evt =>{
    this.setState({ update:  true  })
    this.props.update(this.state.update=true);
    var numbers = JSON.parse(localStorage.getItem("numbers"));
    const butsId =JSON.parse(localStorage.getItem("butId"));
    const storedbutsId = Array.from(butsId);

    if (localStorage.getItem("butId")==="[]") {
      localStorage.setItem("numbers", ("["+ numbers + "," + [numbers.length+1] +"]"));
    }
    if (localStorage.getItem("butId")!=="[]") {
      if (numbers.length===0) {
        let add = storedbutsId.shift();
        localStorage.setItem("numbers", ("["+  add +"]"));
        localStorage.setItem("butId", ("[" + storedbutsId + "]"));
      }
      else {
        let add = storedbutsId.shift();
        localStorage.setItem("numbers", ("["+ numbers + "," + add +"]"));
        localStorage.setItem("butId", ("[" + storedbutsId + "]"));
      }
    }
  }
  render() {
    var addCard = this.addCard;
    return (
      <div >
        <button className="btn btn-secondary ml-2 op mt-2 wth" onClick={addCard}>
          Add Card +
        </button>
      </div>
    );
  }
}

export default ButtonSet;
