import '../../App.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setColName } from '../../actions/ColAction';

class ColumnName extends Component {
  reNameCol = event => {
    const idCol = event.target.id;
    const valueCol = event.target.value;
    this.props.setColNameAction(valueCol, idCol);
  };

  render() {
    const { columnNameId, lock } = this.props;
    if (!lock) {
      return (
        <input
          id={columnNameId}
          onBlur={this.reNameCol}
          type="text"
          className=" nameInput inputName_unLock form-control-sm mt-1 mb-1 "
          defaultValue={this.props.columnNames[columnNameId - 1].columnName}
          placeholder="Column name"
        />
      );
    }

    if (this.props.columnNames[columnNameId - 1].columnName === '') {
      return (
        <input
          id={columnNameId}
          onBlur={this.reNameCol}
          type="text"
          className="nameInput inputName_lock form-control-sm mt-1 mb-1"
          placeholder="Column name"
        />
      );
    }

    return (
      <div className="columnNameId">
        <b>{this.props.columnNames[columnNameId - 1].columnName}</b>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    columnNames: store.columnNames,
  };
}

const mapDispatchToProps = dispatch => ({
  setColNameAction: (idCol, valueCol) => dispatch(setColName(idCol, valueCol)),
});
ColumnName.propTypes = {
  update: PropTypes.func,
  lock: PropTypes.bool,
  columnNameId: PropTypes.number,
  columnNames: PropTypes.array,
  setColNameAction: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColumnName);
