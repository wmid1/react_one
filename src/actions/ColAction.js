/* eslint-disable import/prefer-default-export */
export function setCol(col, idCol) {
  return {
    type: 'COPY_COL',
    payload: col,
    idCol,
  };
}

export function addBtn() {
  return {
    type: 'ADD_BTN',
    payload: '',
  };
}
export function delBtn(delNum) {
  return {
    type: 'DEL_BTN',
    payload: delNum,
  };
}
export function addQuant() {
  return {
    type: 'ADD_QUANT',
    payload: '',
  };
}
export function addCard(columnId) {
  return {
    type: 'ADD_CARD',
    payload: columnId,
  };
}
export function delCard(columnId, cardId) {
  return {
    type: 'DEL_CARD',
    payload: columnId,
    cardId,
  };
}
export function delQuant(delNum) {
  return {
    type: 'DEL_QUANT',
    payload: delNum,
  };
}
export function setColName(valueCol, idCol) {
  return {
    type: 'SET_COL_NAME',
    payload: valueCol,
    idCol,
  };
}
export function setUsername(username) {
  return {
    type: 'SET_USERNAME',
    payload: username,
  };
}
export function startEnd() {
  return {
    type: 'START_END',
    payload: false,
  };
}

export function setTask(columnId, cardId, valueTask) {
  return {
    type: 'SET_TASK',
    payload: columnId,
    cardId,
    valueTask,
  };
}
export function setDesc(columnId, cardId, valueDesc, username) {
  return {
    type: 'SET_DESC',
    payload: columnId,
    cardId,
    valueDesc,
    username,
  };
}
export function setComment(columnId, cardId, valueComment, username) {
  return {
    type: 'SET_COMMENT',
    payload: columnId,
    cardId,
    valueComment,
    username,
  };
}
export function setUserTask(columnId, cardId, username) {
  return {
    type: 'SET_USER_TASK',
    payload: columnId,
    cardId,
    username,
  };
}
