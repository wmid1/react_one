export function addColumn() {
  return {
    type: 'ADD_COLUMN',
    payload: '',
  };
}

export function delColumn(delNum) {
  return {
    type: 'DEL_COLUMN',
    payload: delNum,
  };
}

export function addCard(indexCol) {
  return {
    type: 'ADD_CARD',
    payload: indexCol,
  };
}

export function delCard(indexCol, indexCard) {
  return {
    type: 'DEL_CARD',
    payload: indexCol,
    indexCard,
  };
}

export function setColName(valueCol, columnNameId) {
  return {
    type: 'SET_COL_NAME',
    payload: valueCol,
    columnNameId,
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

export function setTask(valueTask) {
  return {
    type: 'SET_TASK',
    payload: valueTask,
  };
}
export function setDesc(valueDesc) {
  return {
    type: 'SET_DESC',
    payload: valueDesc,
  };
}
export function setComment(valueComment, username) {
  return {
    type: 'SET_COMMENT',
    payload: valueComment,
    username,
  };
}
export function openCard(initialCard) {
  return {
    type: 'CARD_OPEN',
    payload: initialCard,
  };
}
export function updateCard(card, columnId, indexCard) {
  return {
    type: 'CARD_UPDATE',
    payload: card,
    columnId,
    indexCard,
  };
}
