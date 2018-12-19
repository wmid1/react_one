import '../App.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class ColumnName_1 extends Component {
  showList (){
    return this.props.columnNames.map((columnName) => {
      return (
        <h6 key={columnName.id}>{columnName.columnName}</h6>
      );
    });
  }

  render() {
    return (
      <div>
        {this.showList()}
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
  columnNames: state.columnNames
};
}
ColumnName_1.propTypes = {
  update: PropTypes.func,
  lock: PropTypes.bool,
  columnNameId: PropTypes.string
};
export default connect(mapStateToProps)(ColumnName_1);
