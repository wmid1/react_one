import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DelCard extends Component {
  state = { update: false };

  delItem = (cardId, columnId, evn) => {
    const cardIdArr = JSON.parse(localStorage.getItem(`array_${columnId}`));
    const fakeArr = JSON.parse(localStorage.getItem(`fakeArr_${columnId}`));
    const cardIdArray = Array.from(cardIdArr);
    const fakeArray = Array.from(fakeArr);
    cardIdArray.splice(cardIdArray.indexOf(Number(cardId)), 1);
    fakeArray.push(cardId);
    localStorage.setItem(`array_${columnId}`, `[${cardIdArray}]`);
    localStorage.setItem(`fakeArr_${columnId}`, `[${fakeArray}]`);
    localStorage.removeItem(`${columnId},${cardId}`);
    localStorage.removeItem(`commentArr_${columnId},${cardId}`);
    localStorage.removeItem(`description_${columnId},${cardId}`);

    for (let i = 0; i < 20; i++) {
      localStorage.removeItem(`comments_${columnId},${cardId},${i}`);
      localStorage.removeItem(`comments_${columnId},${cardId},${i}_username`);
    }
    this.props.update(true);
  };

  render() {
    const delItem = this.delItem;
    const { columnId, cardId, lock } = this.props;
    function DelIncl(props) {
      if (lock !== true) {
        return (
          <button className="close mr-2 align-top" aria-label="Close" onClick={evn => delItem(cardId, columnId)}>
            <span aria-hidden="true">&times;</span>
          </button>
        );
      }
      return null;
    }
    return (
      <div>
        <DelIncl />
      </div>
    );
  }
}
DelCard.propTypes = {
  cardId: PropTypes.string,
  lock: PropTypes.bool,
  columnId: PropTypes.string,
};
export default DelCard;
