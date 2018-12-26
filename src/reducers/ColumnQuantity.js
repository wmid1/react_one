const initialState = [1, 2, 3, 4];
const fakeQuant = [];

export default function(state = initialState, action) {
  const arrayQuant = [...state];
  switch (action.type) {
    case 'ADD_QUANT':
      // eslint-disable-next-line no-case-declarations
      const arrBox = fakeQuant.concat(...state);
      if (arrayQuant.length === 0) {
        arrayQuant[0] = Math.max(...arrBox) + 1;
      } else {
        arrayQuant[arrayQuant.length] = Number(Math.max(...arrBox) + 1);
      }
      return arrayQuant;

    case 'DEL_QUANT':
      fakeQuant.push(action.payload);
      arrayQuant.splice(arrayQuant.indexOf(action.payload), 1);
      return arrayQuant;

    default:
      return state;
  }
}
