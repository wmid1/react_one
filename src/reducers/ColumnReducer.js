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
      return state.map(column => {
        if (column.id === action.payload) {
          return {
            ...column,
            cards: [
              ...column.cards,
              {
                id: uuidv4(),
                task: '',
                desc: '',
                comments: [],
              },
            ],
          };
        }

        return column;
      });
    }

    case 'DEL_CARD': {
      const arrayObjects = [...state];
      arrayObjects[action.payload].cards.splice(action.indexCard, 1);

      return arrayObjects;
    }

    case 'SET_COL_NAME': {
      return state.map(column => {
        if (column.id === action.columnNameId) {
          return {
            ...column,
            columnName: action.payload,
          };
        }

        return column;
      });
    }

    case 'CARD_UPDATE': {
      return state.map(column => {
        if (column.id === action.columnId) {
          return {
            ...column,
            cards: column.cards.map(card => {
              if (card.id === action.cardId) {
                return action.payload;
              }
              return card;
            }),
          };
        }

        return column;
      });
    }

    default:
      return state;
  }
}
