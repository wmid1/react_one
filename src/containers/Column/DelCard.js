import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delCard } from '../../actions/ColAction';

class DelCard extends Component {
  state = { update: false };

  delItem = (columnId, cardId) => {
    if (!this.props.lock) {
      this.props.delCardAction(columnId, cardId);
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
    columnNames: store.columnNames,
  };
}

const mapDispatchToProps = dispatch => ({
  delCardAction: (columnId, cardId) => dispatch(delCard(columnId, cardId)),
});
DelCard.propTypes = {
  cardId: PropTypes.number,
  lock: PropTypes.bool,
  columnId: PropTypes.number,
  update: PropTypes.func,
  delCardAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DelCard);
