import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delCard } from '../../actions/ColAction';

class DelCard extends Component {
  state = { update: false };

  delItem = (columnId, cardId) => {
    const indexCol = this.props.columnArr.findIndex(obj => obj.id === columnId);
    const cardBox = this.props.columnArr[indexCol].cards;
    const indexCard = cardBox.findIndex(obj => obj.id === cardId);
    if (!this.props.lock) {
      this.props.delCardAction(indexCol, indexCard);
    }
  };

  render() {
    const { columnId, cardId, lock } = this.props;

    if (lock !== true) {
      return (
        <button className="close mr-2 align-top" aria-label="Close" onClick={() => this.delItem(columnId, cardId)}>
          <span aria-hidden="true">&times;</span>
        </button>
      );
    }
    return null;
  }
}
function mapStateToProps(store) {
  return {
    columnArr: store.columnArr,
  };
}

const mapDispatchToProps = dispatch => ({
  delCardAction: (indexCol, indexCard) => dispatch(delCard(indexCol, indexCard)),
});
DelCard.propTypes = {
  lock: PropTypes.bool,
  cardId: PropTypes.string,
  columnId: PropTypes.string,
  columnArr: PropTypes.array,
  delCardAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DelCard);
