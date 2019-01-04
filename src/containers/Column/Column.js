import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCard, openCard } from '../../actions/ColAction';
import DelCard from './DelCard';
import './componentsStyle.css';

class Column extends Component {
  addCard = indexCol => {
    this.props.addCardAction(indexCol);
  };

  popUpCard = (cardBox, columnId, cardId) => {
    const indexCard = cardBox.findIndex(obj => obj.id === cardId);
    const initialCard = cardBox[indexCard];
    this.props.openCardAction(initialCard);
    this.props.colChangeOpen(columnId);
    this.props.cardChangeOpen(cardId);
    this.props.modalChangeOpen(true);
  };

  render() {
    const { columnId, lock } = this.props;
    const indexCol = this.props.columnArr.findIndex(obj => obj.id === columnId);
    const cardBox = this.props.columnArr[indexCol].cards;

    const include = cardBox.map(card => (
      <div key={card.id} className="cardBox">
        <pre type="text" className="ml-2 mr-2 mb-2  text_a" onClick={() => this.popUpCard(cardBox, columnId, card.id)}>
          {card.task}
        </pre>
        <DelCard columnId={columnId} cardId={card.id} lock={lock} />
      </div>
    ));
    if (cardBox.length !== 0) {
      if (cardBox[cardBox.length - 1].task !== '') {
        return (
          <div>
            {include}
            <div>
              <button className="btn btn-secondary mb-2 op" onClick={() => this.addCard(indexCol)}>
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
        <div>
          <button className="btn btn-secondary mb-2 op" onClick={() => this.addCard(indexCol)}>
            Add Card +
          </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(store) {
  return {
    columnArr: store.columnArr,
  };
}
const mapDispatchToProps = dispatch => ({
  openCardAction: initialCard => dispatch(openCard(initialCard)),
  addCardAction: indexCol => dispatch(addCard(indexCol)),
});
Column.propTypes = {
  columnArr: PropTypes.array,
  lock: PropTypes.bool,
  modalChangeOpen: PropTypes.func,
  columnId: PropTypes.string,
  colChangeOpen: PropTypes.func,
  cardChangeOpen: PropTypes.func,
  addCardAction: PropTypes.func.isRequired,
  openCardAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Column);
