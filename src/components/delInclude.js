import React, { Component } from 'react';

class DelInclude extends Component {
  state = { update: false,}
  delItem =(cardId,includeId, evn) =>{
    let includeArr = JSON.parse(localStorage.getItem("array_"+cardId));
    let fakeArr = JSON.parse(localStorage.getItem("fakeArr_"+cardId));
    let includeArray = Array.from(includeArr);
    let fakeArray = Array.from(fakeArr);
    let delInclude = includeArray.splice(includeArray.indexOf(Number(includeId)),1)
    console.log(delInclude);
    fakeArray.push(includeId)
    localStorage.setItem("array_"+cardId, ("[" + includeArray + "]"));
    localStorage.setItem("fakeArr_"+cardId, ("[" + fakeArray + "]"));
    localStorage.removeItem(cardId+","+includeId);
    this.props.update(this.state.update=true);
  }

  render() {
    const delItem = this.delItem;
    const cardId = this.props.cardId;
    const includeId = this.props.includeId;
    const lock = this.props.lock;
    function DelIncl(props) {

      if (lock!==true) {
        return (
          <button className="close mr-2 align-top" aria-label="Close" onClick={evn => delItem(cardId,includeId)}>
            <span aria-hidden="true" >&times;</span>
          </button>

        );
      }
        return null
    }
    return (
      <div>
        <DelIncl />

      </div>
    );
  }

}
export default DelInclude;
