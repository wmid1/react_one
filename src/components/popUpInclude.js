import React, { Component } from 'react';
import './componentsStyle.css'

class PopUpInclude extends Component {
  state = {
    update: false,
    comm: 0,
  }
  close = (idWindow, evt) =>{
    this.setState({ update:  true  })
    this.props.update(this.state.update=true);
    document.getElementById(idWindow).style.display = 'none';
  }
  varCard = (task, description, evn) =>{
    this.setState({ update:  true})
    let username = localStorage.getItem("username");
    localStorage.setItem(task+"_username", username)
    localStorage.setItem(task, document.getElementById(task).value)
  }
  addComment = (task, event) =>{
    let comments ="comments_"+task;
    const comment = localStorage.getItem(comments);
    console.log(this.state.comm);
    this.setState({ comm: this.state.comm +=1})
    let username = localStorage.getItem("username");
    let commentArray = JSON.parse(localStorage.getItem("commentArr_"+task));
    if (localStorage.getItem("commentArr_"+task)===null) {
      localStorage.setItem("commentArr_"+task,"["+1+"]")
      console.log(localStorage.getItem("commentArr_"+task));
    }
    if (localStorage.getItem("commentArr_"+task)==="[1]"){
      console.log(localStorage.getItem("commentArr_"+task));
      if (document.getElementById(comments).value!=='') {
        localStorage.setItem("commentArr_"+task,"["+1+","+2+"]")
        console.log(document.getElementById(comments).value);
        localStorage.setItem(comments+',1'+"_username", username)
        if (comment !== null) {
          localStorage.setItem(comments+',1',document.getElementById(comments).value)

          document.getElementById(comments).value='';
          console.log(localStorage.getItem(comments));
        }
        if (comment === null) {
          localStorage.setItem(comments+',1', document.getElementById(comments).value)
          document.getElementById(comments).value='';
          console.log(localStorage.getItem(comments));
        }
      }
        else {
          document.getElementById(comments).value='';
        }
    }
    else {
      console.log("["+ commentArray + "," + [commentArray.length+1] +"]")
      if (document.getElementById(comments).value!=='') {
        localStorage.setItem("commentArr_"+task, ("["+ commentArray + "," + [commentArray.length+1] +"]"));
        localStorage.setItem(comments+","+ [commentArray.length] +"_username", username)
        console.log(document.getElementById(comments).value);
        if (comment !== null) {
          localStorage.setItem(comments + "," + commentArray.length,document.getElementById(comments).value)
            document.getElementById(comments).value='';
            console.log(localStorage.getItem(comments));
        }
        if (comment === null) {
          localStorage.setItem(comments + "," + commentArray.length, document.getElementById(comments).value)
            document.getElementById(comments).value='';
            console.log(localStorage.getItem(comments));
        }
      }
      else {
        document.getElementById(comments).value='';
      }
    }
}
  render() {
    const varCard = this.varCard;
    const addComment = this.addComment;
    const close = this.close;
    const cardId = this.props.cardId;
    const includeId = this.props.includeId;
    function StartN() {
      let idWindow ="id" + cardId + "," + includeId;
      let task = cardId+','+includeId;
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
                <div className="  justify-content-md-center"> <h2> {localStorage.getItem(cardId + "name")} </h2> </div>
              </div>
              <div className="  justify-content-md-center mt-4">
                <label htmlFor={task}>Наименование задачи:</label>
                <textarea type="text" className=" mb-1 mt-1 text_a text_a_include"
                  id={task}
                  defaultValue={localStorage.getItem(task)}
                  onChange={evn => varCard(task)}
                  rows="2"></textarea>
                <div type="text" className=" username_include"> {localStorage.getItem(userTask)} </div>
              </div>
              <div className=" justify-content-md-center">
                <label >Подробное описание:</label>
                <textarea type="text" className=" mb-1 mt-1 text_a text_a_include"
                  id={description}
                  defaultValue={localStorage.getItem(description)}
                  onChange={evn => varCard(description)}
                  rows="3"></textarea>
                <div className=" username_include"> {localStorage.getItem(description+"_username")} </div>
              </div>
              <div className="  justify-content-md-center">
                  <label >Комментарии:</label>
                  <div  className="block_comments mt-1">
                    {commentItems}
                  </div>
                  <textarea type="text" id={comments} className="comm-a mb-1  text_a text_a_include"
                    placeholder={"Комментарий"}
                    rows="2"></textarea>
                  <button onClick={event => addComment(task)} className="btn btn-secondary ml-2 op mt-2 wth" >
                    Оставить комментарий
                  </button>
              </div>
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
