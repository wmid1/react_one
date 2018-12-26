import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './containers/Header/Header';
import ButtonSet from './containers/ButtonSet/ButtonSet';
import DelColumn from './containers/DelColumn/DelColumn';
import ColumnName from './containers/ColumnName/ColumnName';
import Column from './containers/Column/Column';
import PopUpCard from './containers/Column/PopUpCard';
import './App.css';

class App extends Component {
  state = {
    lock: true,
    update: false,
    value: '',
    modalIsOpen: false,
    colIsOpen: undefined,
    cardIsOpen: undefined,
  };

  modalChangeOpen = value => {
    this.setState({ modalIsOpen: value });
  };

  colChangeOpen = value => {
    this.setState({ colIsOpen: value });
  };

  cardChangeOpen = value => {
    this.setState({ cardIsOpen: value });
  };

  update = value => {
    this.setState({ update: value });
  };

  updateData = value => {
    this.setState({ lock: value });
  };

  render() {
    const { lock, modalIsOpen, colIsOpen, cardIsOpen } = this.state;
    const { modalChangeOpen, colChangeOpen, cardChangeOpen, update } = this;
    const numbers = this.props.colBox;
    const popUp = (
      <PopUpCard
        update={update}
        columnId={colIsOpen}
        cardId={cardIsOpen}
        modalIsOpen={modalIsOpen}
        modalChangeOpen={modalChangeOpen}
      />
    );

    const listItems = numbers.map(number => (
      <div className="bg-card text-white rounded ml-2 mt-2 mb-2" key={`${number}card`}>
        <div className="columnName  form-control-sm">
          <ColumnName columnNameId={number} lock={lock} />
          <DelColumn columnId={number} update={update} lock={lock} />
        </div>
        <Column
          columnId={number}
          update={update}
          lock={lock}
          modalIsOpen={modalIsOpen}
          modalChangeOpen={modalChangeOpen}
          colIsOpen={colIsOpen}
          cardIsOpen={cardIsOpen}
          colChangeOpen={colChangeOpen}
          cardChangeOpen={cardChangeOpen}
        />
      </div>
    ));

    return (
      <div className="container-fluid p-0">
        <Header updateData={this.updateData} />
        <div className="form-inline p-1 line line-1">
          <div id="line" className="form-inline line ">
            {listItems}
            {popUp}
          </div>
          <ButtonSet update={this.update} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    columnNames: store.columnNames,
    colBox: store.colBox,
  };
}

App.propTypes = {
  colBox: PropTypes.arrayOf(PropTypes.number),
  columnNames: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(App);
