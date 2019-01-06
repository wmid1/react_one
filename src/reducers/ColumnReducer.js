import uuidv4 from 'uuid/v4';

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
      const arrayObjects = [...state];
      arrayObjects.splice(action.payload, 1);

      return arrayObjects;
    }
    case 'ADD_CARD': {
      const arrayObjects = [...state];
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
      const arrayObjects = [...state];
      arrayObjects[action.payload].cards.splice(action.cardId, 1);
      return arrayObjects;
    }

    case 'SET_COL_NAME': {
      const arrayObjects = [...state];
      arrayObjects.find(a => a.id === action.columnNameId).columnName = action.payload;
      return arrayObjects;
    }

    case 'CARD_UPDATE': {
      const arrayObjects = [...state];
      arrayObjects.find(a => a.id === action.columnId).cards[action.indexCard] = action.payload;
      return arrayObjects;
    }

    default:
      return state;
  }
}
