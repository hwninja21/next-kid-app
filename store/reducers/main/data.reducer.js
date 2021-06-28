import * as Actions from '../../actions/main/index';

const initialState = {
  activities: null,
  activity_results: null,
  activity_comments: null,
  activity_files: null,
  actResult: null,
  count: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Actions.GET_FILTERED_ACTIVITIES:
    return { ...state, activities: action.payload.doc, count: action.payload.count };
  case Actions.GET_ACTIVITY_COMMENTS:
    return { ...state, activity_comments: action.payload };
  case Actions.GET_ACTIVITY_FILES:
    return { ...state, activity_files: action.payload };
  case Actions.GET_ACTIVITY_RESULTS: 
    return { ...state, activity_results: action.payload };
  case Actions.GET_ACTIVITY_RESULTS_BY_USER:
    return { ...state, actResult: action.payload };
  default:
    return state;
  }
};
