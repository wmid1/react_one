import React, { Component } from 'react';
import './componentsStyle.css'
class PopUpInclude extends Component {
  state = { update: false,}
  close = (idWindow, evt) =>{
    this.setState({ update:  true  })
    this.props.update(this.state.update=true);
    document.getElementById(idWindow).style.display = 'none';
  }
  varCard = (task, evn) =>{
    this.setState({ update:  true})
    localStorage.setItem(task, document.getElementById(task).value)
  }
  render() {
    const varCard = this.varCard;
    const close = this.close;
    const cardId = this.props.cardId;
    const includeId = this.props.includeId;
    function StartN() {
      let idWindow ="id" + cardId + "," + includeId;
      let task = cardId+','+includeId;
        return (
          <div id={idWindow} className="window">
            <div id="content_window">
            <button className="close align-top" aria-label="Close" onClick={evt => close(idWindow)}>
              <span aria-hidden="true" >&times;</span>
            </button>
              {"Карта номер: " + cardId + "," + includeId}
              <textarea type="text" className="ml-2 mr-2 mb-1 mt-1 text_a"
                id={task}
                defaultValue={localStorage.getItem(task)}
                onChange={evn => varCard(task)}
                rows="2"></textarea>
              <textarea type="text" className="ml-2 mr-2 mb-1 mt-1 text_a"
                id={cardId+','+includeId}
                label={"Описание:"}

                rows="2"></textarea>
              <textarea type="text" className="ml-2 mr-2 mb-1 mt-1 text_a"
                id={cardId+','+includeId}
                placeholder={"Комментарий"}
                rows="2"></textarea>
            </div>
          </div>
        );
    }

    return (
      <div>
        {StartN()}
      </div>
    );
  }

}
export default PopUpInclude;
