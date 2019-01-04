import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delColumn } from '../../actions/ColAction';
import '../../App.css';

class DelColumn extends Component {
  delColumn = indexCol => {
    this.setState({ lock: false });
    if (!this.props.lock) {
      this.props.delColumnAction(indexCol);
    }
  };

  render() {
    const { columnId, lock } = this.props;
    const indexCol = this.props.columnArr.findIndex(obj => obj.id === columnId);
    if (!lock) {
      return (
        <div>
          <button className="close ml-2 mb-1" aria-label="Close" onClick={() => this.delColumn(indexCol)}>
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
    columnArr: store.columnArr,
  };
}

const mapDispatchToProps = dispatch => ({
  delColumnAction: indexCol => dispatch(delColumn(indexCol)),
});
DelColumn.propTypes = {
  lock: PropTypes.bool,
  columnId: PropTypes.string,
  columnArr: PropTypes.array,
  delColumnAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DelColumn);
