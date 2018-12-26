const initialState = [
  {
    id: 1,
    columnName: 'TODO',
    cardQuant: [],
    card: [
      {
        task: '',
        desc: '',
        comments: [],
        userComments: [],
        commentsQuant: [1, 2, 3],
        userTask: '',
        userDesc: '',
      },
    ],
  },
  {
    id: 2,
    columnName: 'In Progress',
    cardQuant: [],
    card: [{ task: '', desc: '', comments: [], userComments: [], commentsQuant: [1], userTask: '', userDesc: '' }],
  },
  {
    id: 3,
    columnName: 'Testing',
    cardQuant: [],
    card: [{ task: '', desc: '', comments: [], userComments: [], commentsQuant: [1], userTask: '', userDesc: '' }],
  },
  {
    id: 4,
    columnName: 'Done',
    cardQuant: [],
    card: [{ task: '', desc: '', comments: [], userComments: [], commentsQuant: [1], userTask: '', userDesc: '' }],
  },
];

export default function(state = initialState, action) {
  const arrayObjects = [...state];
  switch (action.type) {
    case 'ADD_BTN':
      return [
        ...state,
        {
          id: arrayObjects.length + 1,
          columnName: '',
          cardQuant: [],
          card: [
            { task: '', desc: '', comments: [], userComments: [], commentsQuant: [1], userTask: '', userDesc: '' },
          ],
        },
      ];

    case 'DEL_BTN':
      arrayObjects[action.payload - 1] = {
        id: action.payload,
        columnName: '',
        cardQuant: [],
        card: [{ task: '', desc: '', comments: [], userComments: [], commentsQuant: [1], userTask: '', userDesc: '' }],
      };
      return arrayObjects;

    case 'ADD_CARD':
      arrayObjects[action.payload - 1].card = [
        ...arrayObjects[action.payload - 1].card,
        {
          task: '',
          desc: '',
          comments: [],
          userComments: [],
          commentsQuant: [1],
          userTask: '',
          userDesc: '',
        },
      ];
      if (arrayObjects[action.payload - 1].cardQuant.length === 0) {
        arrayObjects[action.payload - 1].cardQuant[0] = 1;
      } else {
        arrayObjects[action.payload - 1].cardQuant[Math.max(...arrayObjects[action.payload - 1].cardQuant)] =
          Math.max(...arrayObjects[action.payload - 1].cardQuant) + 1;
      }
      return arrayObjects;

    case 'DEL_CARD':
      arrayObjects[action.payload - 1].cardQuant.splice(
        arrayObjects[action.payload - 1].cardQuant.indexOf(action.payload),
        1,
      );
      arrayObjects[action.payload - 1].card[action.cardId - 1] = {
        task: '',
        desc: '',
        comments: [],
        userComments: [],
        commentsQuant: [1],
        userTask: '',
        userDesc: '',
      };
      return arrayObjects;

    case 'SET_COL_NAME':
      arrayObjects[Number(action.idCol) - 1].columnName = action.payload;
      return arrayObjects;

    case 'SET_TASK':
      arrayObjects[action.payload - 1].card[action.cardId - 1].task = action.valueTask;
      return arrayObjects;

    case 'SET_USER_TASK':
      arrayObjects[action.payload - 1].card[action.cardId - 1].userTask = action.username;
      return arrayObjects;

    case 'SET_DESC':
      arrayObjects[action.payload - 1].card[action.cardId - 1].desc = action.valueDesk;
      arrayObjects[action.payload - 1].card[action.cardId - 1].userDesc = action.username;

      return arrayObjects;

    case 'SET_COMMENT':
      // eslint-disable-next-line no-case-declarations
      const arrayCard = arrayObjects[action.payload - 1].card[action.cardId - 1];
      arrayCard.commentsQuant[Math.max(...arrayCard.commentsQuant)] = Math.max(...arrayCard.commentsQuant) + 1;
      arrayCard.comments = [...arrayCard.comments, action.valueComment];
      arrayCard.userComments = [...arrayCard.userComments, action.username];

      return arrayObjects;

    default:
      return state;
  }
}
