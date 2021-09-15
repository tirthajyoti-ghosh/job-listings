const peopleSearchResultsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PEOPLE_SEARCH_RESULTS':
      return action.value;
    default:
      return state;
  }
};

export default peopleSearchResultsReducer;
