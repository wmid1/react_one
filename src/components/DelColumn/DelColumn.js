import '../../App.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DelColumn extends Component {

  delColumn = (columnId, evt) =>{
    this.props.update(true);
    this.setState({ lock:  false  })
    const numbers =JSON.parse(localStorage.getItem("numbers"));
    const columnsId =JSON.parse(localStorage.getItem("columnId"));
    const storedcolumnsId = Array.from(columnsId);
    const storedNumbers = Array.from(numbers);
    const delName = storedNumbers.splice(storedNumbers.indexOf(Number(columnId)), 1);
    storedcolumnsId.push(columnId);
    if (!this.props.lock) {
      localStorage.setItem("columnId", ("[" + storedcolumnsId + "]"));
      localStorage.setItem("numbers", ("[" + storedNumbers + "]"));
      localStorage.removeItem(Number(delName));
      localStorage.removeItem(delName+"name");
      localStorage.removeItem("array_"+columnId);
      localStorage.removeItem("fakeArr_"+columnId);
      localStorage.removeItem("comments_"+columnId+",1");
      localStorage.removeItem("comments_"+columnId+",1_username");
      for (let i = 0; i < 20; i++) {
        localStorage.removeItem(columnId+","+i+"_username");
        localStorage.removeItem(columnId+","+i);
        localStorage.removeItem("description_"+columnId+","+i);
        localStorage.removeItem("description_"+columnId+","+i+"_username");
        localStorage.removeItem("commentArr_"+columnId+","+i);
        for (let b = 0; b < 15; b++){
          localStorage.removeItem("comments_"+columnId+","+i+","+b);
          localStorage.removeItem("comments_"+columnId+","+i+","+b+"_username");
      }}
    }
  }

  render() {
  const delColumn = this.delColumn;
  let {columnId, lock} = this.props;
  function DelColumn(props) {
    if (!lock) {
      return (
        <button className="close ml-2 mb-1" aria-label="Close"  onClick={evt => delColumn(columnId)}>
          <span aria-hidden="true" >&times;</span>
        </button>
      );
    }
    return null
  }


return (
  <div>
    <DelColumn />
  </div>
    );
  }
}
DelColumn.propTypes = {
  update: PropTypes.func,
  lock: PropTypes.bool,
  columnId: PropTypes.string
};
export default DelColumn;
