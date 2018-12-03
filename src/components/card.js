import React, { Component } from 'react';
import DelInclude from './delInclude'
import './componentsStyle.css'
const varCard = (cardId, evn) =>{
  localStorage.setItem(cardId, document.getElementById(cardId).value)
}
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
  const includes = JSON.parse(localStorage.getItem(nameArray));
  const include = includes.map((number) =>
      <div key={number.toString()} className="includes">
        <textarea type="text" className="form-control rounded ml-2 mr-2 mb-1 mt-1"
          id={cardId+','+number.toString()}
          defaultValue={localStorage.getItem(cardId+','+number.toString())}
          onChange={evn => varCard(cardId+','+number.toString())}
          rows="2"></textarea>
        <DelInclude
          cardId={cardId}
          includeId={number.toString()}
          lock={lock}
          update={update}
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
