const peopleDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PEOPLE_DETAILS':
      return action.value;
    default:
      return state;
  }
};

export default peopleDetailsReducer;
