import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASK,
  GET_TASKS,
  TASK_LOADING,
  TASKS_LOADING
} from "../actions/types";

const initialState = {
  task: [],
  tasks: [],
  taskLoading: false,
  tasksLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
      case GET_TASK:
        return {
          ...state,
          task: action.payload,
          taskLoading: false
        };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        tasksLoading: false
      };
    case UPDATE_TASK:
      let index = state.tasks.findIndex(
        task => task._id === action.payload._id
      );

      state.tasks.splice(index, 1);

      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case TASK_LOADING:
      return {
        ...state,
        taskLoading: true
      };
    case TASKS_LOADING:
      return {
        ...state,
        tasksLoading: true
      };
    default:
      return state;
  }
}
