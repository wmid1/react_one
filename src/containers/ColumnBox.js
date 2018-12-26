import '../App.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setCol } from '../actions/ColAction';

class ColumnBox extends Component {
  onBtnClick = e => {
    const col = e.currentTarget.innerText;
    const idCol = e.target.id;
    this.props.setColAction(col, idCol);
  };

  showList() {
    return this.props.columnNames.map(columnName => (
      <div key={columnName.id}>
        <h6 id={columnName.id} onClick={this.onBtnClick}>
          {columnName.columnName}
        </h6>
        <p>{columnName.comments}</p>
      </div>
    ));
  }

  render() {
    /* console.log(this.props);

    const { setColAction } = this.props; */
    return <div>{this.showList()}</div>;
  }
}
function mapStateToProps(store) {
  return {
    columnNames: store.columnNames,
  };
}

const mapDispatchToProps = dispatch => ({
  setColAction: (col, idCol) => dispatch(setCol(col, idCol)),
});

ColumnBox.propTypes = {
  update: PropTypes.func,
  lock: PropTypes.bool,
  columnNameId: PropTypes.number,
  columnNames: PropTypes.arrayOf(PropTypes.object),
  setColAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColumnBox);
