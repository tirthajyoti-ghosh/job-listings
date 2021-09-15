const jobSearchResultsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_JOB_SEARCH_RESULTS':
      return action.value;
    default:
      return state;
  }
};

export default jobSearchResultsReducer;
