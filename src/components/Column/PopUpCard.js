import React, { Component } from 'react';
import './componentsStyle.css'
import PropTypes from 'prop-types';

class PopUpCard extends Component {
  state = {
    update: false,
    comm: 0,
    comment: ''
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let username = localStorage.getItem("username");
    this.setState({value: event.target.value});
    localStorage.setItem(event.target.id+"_username", username)
    localStorage.setItem(event.target.id, event.target.value)
  }

  close = (idWindow, evt) =>{
    this.setState({ update:  true  })
    this.props.update(true);
    this.props.modalChangeOpen(false)
  }

  addComment = (task, event) =>{
    let comments ="comments_"+task;
    const comment = localStorage.getItem(comments);
    let comm = this.state.comm;
    this.setState({ comm: comm +=1})
    let username = localStorage.getItem("username");
    let commentArray = JSON.parse(localStorage.getItem("commentArr_"+task));
    if (localStorage.getItem("commentArr_"+task)===null) {
      localStorage.setItem("commentArr_"+task,"["+1+"]")
    }
    if (localStorage.getItem("commentArr_"+task)==="[1]"){
      if (comment!=='') {
        localStorage.setItem("commentArr_"+task,"["+1+","+2+"]")
        localStorage.setItem(comments+",1_username", username)
        localStorage.setItem(comments+',1',comment)
        localStorage.setItem(comments,'')
      }
      else {
        localStorage.setItem(comments,'')
      }
    }
    else {
      if (comment!=='') {
        localStorage.setItem("commentArr_"+task, ("["+ commentArray + "," + [commentArray.length+1] +"]"));
        localStorage.setItem(comments+","+ [commentArray.length] +"_username", username)
        localStorage.setItem(comments + "," + commentArray.length,comment)
        localStorage.setItem(comments, '')
      }
      else {
        localStorage.setItem(comments, '')
      }
    }
  }

  render() {
    const addComment = this.addComment;
    const close = this.close;
    const onChange = this.handleChange;
    const {columnId, cardId, modalIsOpen} = this.props;
    function StartN() {
      if (modalIsOpen) {
      let idWindow ="id" + columnId + "," + cardId;
      let task = columnId+','+cardId;
      let description = "description_" + task;
      let comments = "comments_" + task;
      const commentItem = localStorage.getItem("commentArr_"+task)!==null?JSON.parse(localStorage.getItem("commentArr_"+task)):[1];
      const commentItems = commentItem.map((number) =>
        <div className="comments-inBlock" key={number.toString()} id={comments+number.toString()}>
          <b>{localStorage.getItem(comments+","+number.toString()+"_username")}</b>
          <p>{localStorage.getItem(comments+","+number.toString())}</p>
        </div>
      );
      const userTask = task+"_username";

        return (
          <div id={idWindow} className="p-0 window">
            <div id="content_window" className="col-md-auto">
              <div >
                <button className="  justify-content-md-end close align-top mr-2" aria-label="Close" onClick={evt => close(idWindow)}>
                  <span aria-hidden="true" >&times;</span>
                </button>
                <div className="  justify-content-md-center"> <h2> {localStorage.getItem(columnId + "name")} </h2> </div>
              </div>
              <div className="  justify-content-md-center mt-4">
                <label htmlFor={task}>Task name:</label>
                <textarea type="text" className=" mb-1 mt-1 text_a text_a_include"
                  id={task}
                  defaultValue={localStorage.getItem(task)}
                  onChange={onChange}
                  rows="2"></textarea>
                <div type="text" className=" username_include"> {localStorage.getItem(userTask)} </div>
              </div>
              <div className=" justify-content-md-center">
                <label >Full description:</label>
                <textarea type="text" className=" mb-1 mt-1 text_a text_a_include"
                  id={description}
                  defaultValue={localStorage.getItem(description)}
                  onChange={onChange}
                  rows="3"></textarea>
                <div className=" username_include"> {localStorage.getItem(description+"_username")} </div>
              </div>
              <div className="  justify-content-md-center">
                  <label >Comments:</label>
                  <div  className="block_comments mt-1">
                    {commentItems}
                  </div>
                  <textarea type="text" id={comments} onChange={onChange} value={localStorage.getItem("comments_"+task)} className="comm-a mb-1  text_a text_a_include"
                    placeholder={" leave a comment"}
                    rows="2"></textarea>
                  <button onClick={event => addComment(task)} className="btn btn-secondary ml-2 op mt-2 wth" >
                    Add comment
                  </button>
              </div>
            </div>
          </div>
        );
      }
      return null
    }
    return (
      <div>
        {StartN()}
      </div>
    );
  }
}
PopUpCard.propTypes = {
  modalIsOpen: PropTypes.bool,
  cardId: PropTypes.string,
  columnId: PropTypes.string,
  update: PropTypes.func,
  modalChangeOpen: PropTypes.func
};
export default PopUpCard;
