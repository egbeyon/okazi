import axios from "axios";

import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  TASKS_LOADING
} from "./types";
import { USER_SERVER } from '../components/Config.js';

// Create Task
export const createTask = taskData => dispatch => {
  axios
    .post(`${USER_SERVER}/api/tasks/create`, taskData)
    .then(res =>
      dispatch({
        type: CREATE_TASK,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Get tasks by project id
export const getTasks = id => dispatch => {
  dispatch(setTasksLoading());
  axios
    .get(`${USER_SERVER}/api/tasks/${id}`)
    .then(res =>
      dispatch({
        type: GET_TASKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TASKS,
        payload: null
      })
    );
};

// Delete Task
export const deleteTask = id => dispatch => {
  axios
    .delete(`${USER_SERVER}/api/tasks/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    )
    .catch(err => console.log(err));
};

// Update Task
export const updateTask = taskData => dispatch => {
  axios
    .patch(`${USER_SERVER}/api/tasks/update`, taskData)
    .then(res =>
      dispatch({
        type: UPDATE_TASK,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Tasks loading
export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING
  };
};
