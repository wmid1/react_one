import '../../App.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColumnName extends Component {
  static handleChange = event => {
    localStorage.setItem(event.target.id, event.target.value);
  };

  state = {
    value: '',
  };

  columnName = () => {
    if (this.state.value !== '') {
      this.setState({ update: true });
    }
  };

  render() {
    const { columnName } = this;
    const { columnNameId, lock } = this.props;
    const onChange = ColumnName.handleChange;

    if (!lock) {
      return (
        <input
          id={columnNameId}
          onChange={onChange}
          onBlur={() => columnName(columnNameId)}
          type="text"
          className=" nameInput inputName_unLock form-control-sm mt-1 mb-1 "
          defaultValue={localStorage.getItem(columnNameId)}
          placeholder="Column name"
        />
      );
    }

    if (localStorage.getItem(columnNameId) == null || undefined || '') {
      return (
        <input
          id={columnNameId}
          onChange={onChange}
          onBlur={evn => columnName(columnNameId)}
          type="text"
          className="nameInput inputName_lock form-control-sm mt-1 mb-1"
          placeholder="Column name"
        />
      );
    }

    return (
      <div className="columnNameId">
        <b>{localStorage.getItem(columnNameId)}</b>
      </div>
    );
  }
}

ColumnName.propTypes = {
  update: PropTypes.func,
  lock: PropTypes.bool,
  columnNameId: PropTypes.string,
};
export default ColumnName;
