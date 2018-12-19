import React, { Component } from 'react';
import DelCard from './DelCard';
import PropTypes from 'prop-types';
import './componentsStyle.css';

class Column extends Component {
  addCard = (columnId, evt) => {
    const storedArray = JSON.parse(localStorage.getItem(`array_${columnId}`));
    const storedFakeArray = JSON.parse(localStorage.getItem(`fakeArr_${columnId}`));
    const elemArray = Array.from(storedFakeArray);

    if (localStorage.getItem(`fakeArr_${columnId}`)==="[]") {
      if (localStorage.getItem(`array_${columnId}`)==="[]") {
        localStorage.setItem(`array_${columnId}`, (`[${ 1 }]`));
      }
      else {
        localStorage.setItem(`array_${columnId}`, (`[${ storedArray  },${  [storedArray.length+1] }]`));
      }
    }
    if (localStorage.getItem(`fakeArr_${columnId}`)!=="[]") {
      if (storedArray.length === 0) {
        const add = elemArray.shift();
        localStorage.setItem(`array_${columnId}`, (`[${  add }]`));
        localStorage.setItem(`fakeArr_${columnId}`, (`[${  elemArray  }]`));
      }
      else {
        const add = elemArray.shift();
        localStorage.setItem(`array_${columnId}`, (`[${ storedArray  },${  add }]`));
        localStorage.setItem(`fakeArr_${columnId}`, (`[${  elemArray  }]`));
      }
    }
  };

  popUpCard = (columnId, number, evn) => {
    this.props.colChangeOpen(columnId);
    this.props.cardChangeOpen(number);
    this.props.modalChangeOpen(true);
  };

render() {
  const {popUpCard,addCard} = this;
  const {
    update,
    columnId,
    lock
  } = this.props;
function column(props) {

  const nameArray = `array_${columnId}`;
  const fakeArray = `fakeArr_${columnId}`;
  localStorage.setItem(`comments_${columnId},1`,'');
  if (JSON.parse(localStorage.getItem(nameArray)) === null) {
    localStorage.setItem(nameArray,JSON.stringify([]));
    localStorage.setItem(fakeArray,JSON.stringify([]));
      }
  const quote = Array.from(JSON.parse(localStorage.getItem(nameArray)))
  const nameLast = `${columnId},${quote.length}`;

      const includes = JSON.parse(localStorage.getItem(nameArray));
      const include = includes.map(number => (
        <div key={number.toString()} className="includes">
          <textarea
            type="text"
            className="ml-2 mr-2 mb-2  text_a"
            defaultValue={localStorage.getItem(columnId + ',' + number.toString())}
        onClick={evn => popUpCard(columnId,number.toString())}
        readOnly
            rows="2"
          />
          <DelCard columnId={columnId} cardId={number.toString()} lock={lock} update={update} />
        </div>
      ));
      if (quote.length !== 0) {
        if (localStorage.getItem(nameLast) !== null) {
        return (
            <div>
            {include}
              <div onClick={() => update(true)}>
              <button className="btn btn-secondary mb-2 op" onClick={evt => addCard(columnId)}>
                  Add Card +
                </button>
            </div>
          </div>
      );}
      else {
        return (
          <div>
            {include}
          </div>
        }
      } else {
      return (
        <div>
            {include}
          <div onClick={() => update(true)}>
            <button className="btn btn-secondary mb-2 op" onClick={evt => addCard(columnId)}>
                Add Card +
            </button>
            </div>
        </div>
        );
    }
  }
  return (
    <div>
      {column()}
    </div>
  }
}
Column.propTypes = {
  update: PropTypes.func,
  lock: PropTypes.bool,
  modalChangeOpen: PropTypes.func,
  columnId: PropTypes.string,
  colChangeOpen: PropTypes.func,
  cardChangeOpen: PropTypes.func,
};

export default Column;
