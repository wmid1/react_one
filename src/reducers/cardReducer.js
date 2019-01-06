import uuidv4 from 'uuid/v4';

const initialState = {
  id: '',
  task: '',
  desc: '',
  comments: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_TASK': {
      return {
        ...state,
        task: action.payload,
      };
    }

    case 'SET_DESC': {
      return {
        ...state,
        desc: action.payload,
      };
    }

    case 'SET_COMMENT': {
      return {
        ...state,
        comments: [
          ...state.comments,
          {
            id: uuidv4(),
            value: action.payload,
            username: action.username,
          },
        ],
      };
    }
    case 'CARD_OPEN':
      return action.payload;

    default:
      return state;
  }
}
