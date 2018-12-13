import '../../App.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColumnName extends Component {

  state = {
    value: ''
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    localStorage.setItem(event.target.id, event.target.value)
  }

  columnName = (columnNameId, evn) =>{
    if (this.state.value !== '') {
      this.setState({ update:  true})
    }
  }

  render() {
  const columnName = this.columnName;
  let {columnNameId, lock} = this.props;
  const onChange = this.handleChange;
  function ColumnName(props) {
    if (!lock) {
      return(
        <input id={columnNameId} onChange={onChange} onBlur={evn => columnName(columnNameId)}
        type="text" className=" nameInput inputName_unLock form-control-sm mt-1 mb-1 " defaultValue={localStorage.getItem(columnNameId)} placeholder="Название формы"/>
      );
    }
      if (localStorage.getItem(columnNameId) == null || undefined || '') {
       return(
         <input id={columnNameId} onChange={onChange} onBlur={evn => columnName(columnNameId)}
         type="text" className="nameInput inputName_lock form-control-sm mt-1 mb-1" placeholder="Column name"/>
       );
     }
    return(
      <div className="columnNameId">
        <b>{localStorage.getItem(columnNameId)}</b>
      </div>
     )
  }


return (
  <div>
    <ColumnName />
  </div>
    );
  }
}
ColumnName.propTypes = {
  update: PropTypes.func,
  lock: PropTypes.bool,
  columnNameId: PropTypes.string
};
export default ColumnName;
