import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delQuant, delBtn } from '../../actions/ColAction';
import '../../App.css';

class DelColumn extends Component {
  delColumn = columnId => {
    this.setState({ lock: false });
    if (!this.props.lock) {
      this.props.delQuantAction(columnId);
      this.props.delBtnAction(columnId);
    }
  };

  render() {
    const { columnId, lock } = this.props;
    if (!lock) {
      return (
        <div>
          <button className="close ml-2 mb-1" aria-label="Close" onClick={() => this.delColumn(columnId)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return <div />;
  }
}

function mapStateToProps(store) {
  return {
    columnNames: store.columnNames,
  };
}

const mapDispatchToProps = dispatch => ({
  delQuantAction: columnId => dispatch(delQuant(columnId)),
  delBtnAction: columnId => dispatch(delBtn(columnId)),
});
DelColumn.propTypes = {
  update: PropTypes.func,
  lock: PropTypes.bool,
  columnId: PropTypes.number,
  delBtnAction: PropTypes.func.isRequired,
  delQuantAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DelColumn);
