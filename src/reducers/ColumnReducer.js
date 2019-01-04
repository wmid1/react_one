const uuidv4 = require('uuid/v4');
// { id: uuidv4(), value: '', username: '' }
const initialState = [
  {
    id: uuidv4(),
    columnName: 'TODO',
    cards: [
      {
        id: uuidv4(),
        task: '',
        desc: '',
        comments: [],
      },
    ],
  },
  {
    id: uuidv4(),
    columnName: 'In Progress',
    cards: [
      {
        id: uuidv4(),
        task: '',
        desc: '',
        comments: [],
      },
    ],
  },
  {
    id: uuidv4(),
    columnName: 'Testing',
    cards: [
      {
        id: uuidv4(),
        task: '',
        desc: '',
        comments: [],
      },
    ],
  },
  {
    id: uuidv4(),
    columnName: 'Done',
    cards: [
      {
        id: uuidv4(),
        task: '',
        desc: '',
        comments: [],
      },
    ],
  },
];

export default function(state = initialState, action) {
  const arrayObjects = [...state];
  switch (action.type) {
    case 'ADD_COLUMN':
      return [
        ...state,
        {
          id: uuidv4(),
          columnName: '',
          cards: [],
        },
      ];

    case 'DEL_COLUMN': {
      arrayObjects.splice(action.payload, 1);

      return arrayObjects;
    }
    case 'ADD_CARD': {
      arrayObjects[action.payload].cards = [
        ...arrayObjects[action.payload].cards,
        {
          id: uuidv4(),
          task: '',
          desc: '',
          comments: [],
        },
      ];

      return arrayObjects;
    }

    case 'DEL_CARD': {
      arrayObjects[action.payload].cards.splice(action.cardId, 1);
      return arrayObjects;
    }

    case 'SET_COL_NAME': {
      arrayObjects[action.indexCol].columnName = action.payload;

      return arrayObjects;
    }

    case 'CARD_UPDATE': {
      arrayObjects[action.indexCol].cards[action.indexCard] = action.payload;
      return arrayObjects;
    }

    default:
      return state;
  }
}
