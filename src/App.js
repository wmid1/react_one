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
    const { modalChangeOpen, colChangeOpen, cardChangeOpen } = this;
    const columns = this.props.columnArr;
    const popUp = (
      <PopUpCard columnId={colIsOpen} cardId={cardIsOpen} modalIsOpen={modalIsOpen} modalChangeOpen={modalChangeOpen} />
    );

    const listItems = columns.map(column => (
      <div className="bg-card text-white rounded ml-2 mt-2 mb-2" key={column.id}>
        <div className="columnName  form-control-sm">
          <ColumnName columnNameId={column.id} lock={lock} />
          <DelColumn columnId={column.id} lock={lock} />
        </div>
        <Column
          columnId={column.id}
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
          <ButtonSet />
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

App.propTypes = {
  columnArr: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(App);
