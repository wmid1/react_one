import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCard } from '../../actions/ColAction';
import DelCard from './DelCard';
import './componentsStyle.css';

class Column extends Component {
  addCard = columnId => {
    this.props.addCardAction(columnId);
  };

  popUpCard = (columnId, number) => {
    this.props.colChangeOpen(columnId);
    this.props.cardChangeOpen(number);
    this.props.modalChangeOpen(true);
  };

  render() {
    const { update, columnId, lock } = this.props;
    const includes = this.props.columnNames[columnId - 1].cardQuant;
    const cardBox = this.props.columnNames[columnId - 1].card;
    const include = includes.map(number => (
      <div key={number} className="includes">
        <textarea
          type="text"
          className="ml-2 mr-2 mb-2  text_a"
          defaultValue={cardBox[number - 1].task}
          onClick={() => this.popUpCard(columnId, number)}
          readOnly
          rows="2"
        />
        <DelCard columnId={columnId} cardId={number} lock={lock} update={update} />
      </div>
    ));
    if (includes.length !== 0) {
      if (cardBox[Math.max(...includes) - 1].task !== '') {
        return (
          <div>
            {include}
            <div onClick={() => update(true)}>
              <button className="btn btn-secondary mb-2 op" onClick={() => this.addCard(columnId)}>
                Add Card +
              </button>
            </div>
          </div>
        );
      }

      return <div>{include}</div>;
    }
    return (
      <div>
        {include}
        <div onClick={() => update(true)}>
          <button className="btn btn-secondary mb-2 op" onClick={() => this.addCard(columnId)}>
            Add Card +
          </button>
        </div>
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
  addCardAction: columnId => dispatch(addCard(columnId)),
});
Column.propTypes = {
  update: PropTypes.func,
  lock: PropTypes.bool,
  modalChangeOpen: PropTypes.func,
  columnId: PropTypes.number,
  colChangeOpen: PropTypes.func,
  cardChangeOpen: PropTypes.func,
  addCardAction: PropTypes.func.isRequired,
  columnNames: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Column);
