import React, { Component } from 'react';
import DelInclude from './delInclude'
import PopUpInclude from './popUpInclude'
import './componentsStyle.css'

const addInclude = (cardId,evt) =>{
  console.log(cardId);
  let storedArray = JSON.parse(localStorage.getItem('array_'+cardId));
  let storedFakeArray = JSON.parse(localStorage.getItem('fakeArr_'+cardId));
  console.log(storedFakeArray);
  let elemArray=Array.from(storedFakeArray);

  if (localStorage.getItem("fakeArr_"+cardId)==="[]") {
    if (localStorage.getItem("array_"+cardId)==="[]") {
      localStorage.setItem('array_'+cardId, ("["+ 1 +"]"));
    }
    else {
      localStorage.setItem('array_'+cardId, ("["+ storedArray + "," + [storedArray.length+1] +"]"));
    }
  }
  if (localStorage.getItem("fakeArr_"+cardId)!=="[]") {
    if (storedArray.length===0) {
      let add = elemArray.shift();
      console.log(storedArray.length);
      localStorage.setItem('array_'+cardId, ("["+  add +"]"));
      localStorage.setItem("fakeArr_"+cardId, ("[" + elemArray + "]"));
    }
    else {
      let add = elemArray.shift();
      console.log(add);
      console.log(localStorage.getItem("fakeArr_"+cardId));
      localStorage.setItem('array_'+cardId, ("["+ storedArray + "," + add +"]"));
      localStorage.setItem("fakeArr_"+cardId, ("[" + elemArray + "]"));
    }
  }
}

const popUpCard = (cardId,number, evn) =>{
  let idWindow ="id" + cardId + "," + number;
  let el = document.getElementById(idWindow).style.display = 'block';
}

function Card(props) {
  let update = props.update;
  let cardId = props.cardId;
  let lock = props.lock;
  let nameArray = "array_"+cardId;
  let fakeArray = "fakeArr_"+cardId;
  if (JSON.parse(localStorage.getItem(nameArray)) === null) {
    localStorage.setItem(nameArray,JSON.stringify([]));
    localStorage.setItem(fakeArray,JSON.stringify([]));
  }
  let log = console.log("Hi!");
  const includes = JSON.parse(localStorage.getItem(nameArray));
  const include = includes.map((number) =>
      <div key={number.toString()} className="includes">
        <textarea type="text" className="ml-2 mr-2 mb-1 mt-1 text_a"
          defaultValue={localStorage.getItem(cardId+','+number.toString())}
          onClick={evn => popUpCard(cardId,number)}
          readOnly
          rows="2"></textarea>
        <DelInclude
          cardId={cardId}
          includeId={number.toString()}
          lock={lock}
          update={update}
        />
        <PopUpInclude
          update={update}
          cardId={cardId.toString()}
          includeId={number.toString()}
        />

      </div>
    );
  return (
    <div>
      {include}
      <div onClick={() => update(true)}>
        <button className="btn btn-secondary mb-2 op mt-1" onClick={evt => addInclude(cardId)}>
          Add Include +
        </button>
      </div>
    </div>
  );
  }


export default Card;
