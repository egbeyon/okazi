import axios from "axios";
import {
  CREATE_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
  GET_FIELDS,
  // FIELD_LOADING,
  // FIELDS_LOADING
} from "./types";
import { USER_SERVER } from '../components/Config.js';

// Create Task
export const createField = fata => dispatch => {
  axios
    .post(`${USER_SERVER}/api/fields/create`, fata)
    .then(res =>
      dispatch({
        type: CREATE_FIELD,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Get tasks by project id
export const getField = id => dispatch => {
  //dispatch(setFieldLoading());
  axios
    .get(`${USER_SERVER}/api/fields/${id}`)
    .then(res =>
      dispatch({
        type: GET_FIELDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FIELDS,
        payload: null
      })
    );
};

// Delete Task
export const deleteField = id => dispatch => {
  axios
    .delete(`${USER_SERVER}/api/fields/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_FIELD,
        payload: id
      })
    )
    .catch(err => console.log(err));
};

// Update Task
export const updateField = (fieldData) => dispatch => {
  axios
    .patch(`${USER_SERVER}/api/fields/update/`, fieldData)
    .then(res =>
      dispatch({
        type: UPDATE_FIELD,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Tasks loading
// export const setFieldLoading = () => {
//   return {
//     type: FIELDS_LOADING
//   };
// };
