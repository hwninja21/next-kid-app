import Router from 'next/router';
import api from '../../../config/ApiConfig.js'
import * as actions from './message.actions';

export const GET_FILTERED_ACTIVITIES = '[DATA] GET FILTERED ACTIVITIES';
export const GET_ACTIVITY_COMMENTS = '[DATA] GET ACTIVITIE COMMENTS';
export const GET_ACTIVITY_FILES = '[DATA] GET ACTIVITIE FILES';
export const GET_ACTIVITY_RESULTS = '[DATA] GET ACTIVITIE RESULTS';
export const GET_ACTIVITY_RESULTS_BY_USER = '[DATA] GET ACTIVITIE RESULTS BY USER';

// gets token from the api and stores it in the redux store and in cookie
export const get_filtered_activities = (filters) => {
  return (dispatch) => {
    api.post('data/get-filtered-activities', filters)
      .then((response) => {
        dispatch({type: GET_FILTERED_ACTIVITIES, payload: response.data});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get filtered activites failed."}));
        // throw new Error(err);
      });
  };
};

export const get_activity_comments_by_id = (activityid) => {
  return (dispatch) => {
    api.post('data/get-activity-comments-by-id', { activityid })
      .then((response) => {
        dispatch({type: GET_ACTIVITY_COMMENTS, payload: response.data.doc});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get filtered activites failed."}));
        // throw new Error(err);
      });
  };
};

export const add_activity_comment = (params) => {
  return (dispatch) => {
    api.post('data/add-activity-comment', { row: params })
      .then((response) => {
        dispatch(get_activity_comments_by_id(params.activityid));
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get filtered activites failed."}));
        // throw new Error(err);
      });
  };
};

export const get_activity_files_by_id = (activityid) => {
  return (dispatch) => {
    api.post('data/get-activity-files-by-id', { activityid })
      .then((response) => {
        dispatch({type: GET_ACTIVITY_FILES, payload: response.data.doc});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get filtered activites failed."}));
        // throw new Error(err);
      });
  };
};

export const update_activity_result = (params) => {
  return (dispatch) => {
    api.post('data/update-activity-result', params)
      .then((response) => {
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Update activity result failed."}));
        // throw new Error(err);
      });
  };
}

export const get_activity_result = (params) => {
  return (dispatch) => {
    api.post('data/get-activity-result', params)
      .then((response) => {
        dispatch({type: GET_ACTIVITY_RESULTS, payload: response.data.doc});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get activity result failed."}));
        // throw new Error(err);
      });
  };
}

export const get_activity_result_by_user = (params) => {
  return (dispatch) => {
    api.post('data/get-activity-result-by-user', params)
      .then((response) => {
        dispatch({type: GET_ACTIVITY_RESULTS_BY_USER, payload: response.data.doc});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get activity result failed."}));
        // throw new Error(err);
      });
  };
}