import React, { Component } from 'react';
import './App.css'
import Macushka from './Macushka'


class App extends Component {
  state = {
    lock: true,
    update: false
  }
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.state = {lock: true}
    if (JSON.parse(localStorage.getItem("numbers")) == null || undefined) {
    localStorage.setItem("numbers", JSON.stringify([1,2,3,4]));
    localStorage.setItem("butId", ("[]"));
    localStorage.setItem("1name", "TODO")
    localStorage.setItem("2name", "In Progress")
    localStorage.setItem("3name", "Testing")
    localStorage.setItem("4name", "Done")
    }
}


  addCard = evt =>{
    this.setState({ update:  true  })
    var numbers = JSON.parse(localStorage.getItem("numbers"));
    let butsId =JSON.parse(localStorage.getItem("butId"));
    let storedbutsId = Array.from(butsId);

    if (localStorage.getItem("butId")==="[]") {
      localStorage.setItem("numbers", ("["+ numbers + "," + [numbers.length+1] +"]"));
      //localStorage.setItem(numbers.length+1, localStorage.getItem("username"));
    }
    if (localStorage.getItem("butId")!=="[]") {
      console.log(numbers);
      if (numbers.length===0) {
        let add = storedbutsId.shift();
        localStorage.setItem("numbers", ("["+  add +"]"));
        localStorage.setItem("butId", ("[" + storedbutsId + "]"));
        //localStorage.setItem(add, localStorage.getItem("username"));
      }
      else {
        let add = storedbutsId.shift();
        localStorage.setItem("numbers", ("["+ numbers + "," + add +"]"));
        localStorage.setItem("butId", ("[" + storedbutsId + "]"));
        //localStorage.setItem(add, localStorage.getItem("username"));
      }
    }
  }
  updateData = (value) =>{
    this.setState({lock: value})
  }
  delCard = (butId, evt) =>{
    this.setState({ lock:  false  })
    let numbers =JSON.parse(localStorage.getItem("numbers"));
    let butsId =JSON.parse(localStorage.getItem("butId"));
    let storedbutsId = Array.from(butsId);
    let storedNumbers = Array.from(numbers);
    var delName = storedNumbers.splice(storedNumbers.indexOf(Number(butId)), 1);
    console.log(storedNumbers.indexOf(Number(butId)));
    storedbutsId.push(butId);
    if (this.state.lock!==true) {
      localStorage.setItem("butId", ("[" + storedbutsId + "]"));
      localStorage.setItem("numbers", ("[" + storedNumbers + "]"));
      localStorage.removeItem(Number(delName));
      localStorage.removeItem(delName+"name");
      console.log(delName);

    }
  }

  varCard = (cardId, evn) =>{

    localStorage.setItem(cardId, document.getElementById(cardId).value)
    console.log(localStorage.getItem(cardId));
  }
  cardName = (cardNameId, evn) =>{
    console.log(localStorage.getItem(document.getElementById(cardNameId).value));
  if (document.getElementById(cardNameId).value !== "") {
    localStorage.setItem(cardNameId, document.getElementById(cardNameId).value)

    }
  }


  render() {
  var lock = this.state.lock;
  var numbers = JSON.parse(localStorage.getItem("numbers"));
  var addCard = this.addCard;
  var delCard = this.delCard;
  var varCard = this.varCard;
  var cardName = this.cardName;
  function ButtonSet() {
        return (
          <div >
            <button className="btn btn-secondary ml-2 op mt-1" onClick={addCard}>
          +
            </button>
          </div>
        );
  }
  function Card(props) {
    const cardId = props.cardId;
     return(
       <form>
         <textarea type="text" id={cardId} className="form-control rounded ml-2 mr-2 mb-1 mt-1"
         defaultValue={localStorage.getItem(cardId)}
         onBlur={evn => varCard(cardId)}

         rows="6"></textarea>

       </form>
     );
  }
  function CardName(props) {
    const cardNameId = props.cardNameId;
    console.log(localStorage.getItem(cardNameId));
      if (localStorage.getItem(cardNameId) == null || undefined || '') {
       return(
         <input id={cardNameId} onBlur={evn => cardName(cardNameId)}
         type="text" className="form-control form-control-sm " placeholder="Название формы"/>
       );
     }
     return(

        <b>{localStorage.getItem(cardNameId)}</b>

     )
  }
  function DelCard(props) {
    const butId = props.butId;
      if (lock!==true) {

        return (

            <button className="close mr-2 mt-1" aria-label="Close"  onClick={evt => delCard(butId)}>
              <span aria-hidden="true" >&times;</span>
            </button>

        );
      }
      return null
  }

  var onChange = this.handleChange;
  var handleSubmit = this.handleSubmit;
  var value  = this.state.value;
  const buttonSubmit=(
    <button type="submit" className="btn btn-primary ml-2 ">
      Запомнить
      </button>
  );


  function NumberList(props) {
    const numbers = props.numbers;
      const listItems = numbers.map((number) =>
           <div className="bg-card text-white rounded ml-2 mt-2 mb-2" key={number.toString()} >
             <div className="cardName  form-control-sm">

                <CardName cardNameId={number.toString()+'name'}/>
                <DelCard butId={number.toString()}/>
              </div>
                <Card cardId={number.toString()}/>

              <textarea className="form-control rounded ml-2 mr-2 mb-2"  placeholder="Комментарий" rows="1"></textarea>

           </div>
        );
        return (
          <div className="form-inline line line-1">{listItems}

          </div>
        );
  }
return (
  <div className="container-fluid p-0" >
    <Macushka updateData={this.updateData}/>
    <div className="form-inline p-1 line">
      <NumberList numbers={numbers} />
      <ButtonSet />
    </div>
  </div>
        );
      }
}

export default App;
