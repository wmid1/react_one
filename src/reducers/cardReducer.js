const uuidv4 = require('uuid/v4');

const initialState = {
  id: '',
  task: '',
  desc: '',
  comments: [],
};

export default function(state = initialState, action) {
  const arrayCard = { ...state };
  switch (action.type) {
    case 'SET_TASK': {
      arrayCard.task = action.payload;
      return arrayCard;
    }

    case 'SET_DESC': {
      arrayCard.desc = action.payload;
      return arrayCard;
    }

    case 'SET_COMMENT': {
      arrayCard.comments = [
        ...arrayCard.comments,
        {
          id: uuidv4(),
          value: action.payload,
          username: action.username,
        },
      ];
      return arrayCard;
    }
    case 'CARD_OPEN':
      return action.payload;

    default:
      return state;
  }
}
