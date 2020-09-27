import {
  CREATE_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
  GET_FIELD,
  GET_FIELDS,
  FIELD_LOADING,
  FIELDS_LOADING
} from "../actions/types";

const initialState = {
  fields: [],
  field: [],
  
  fieldLoading: false,
  fieldsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_FIELD:
      return {
        ...state,
        fields: [action.payload, ...state.fields]
      };
      case GET_FIELD:
        return {
          ...state,
          field: action.payload,
          fieldLoading: false
        };
    case GET_FIELDS:
      return {
        ...state,
        fields: action.payload,
        fieldsLoading: false
      };
    case UPDATE_FIELD:
      let index = state.fields.findIndex(
        field => field._id === action.payload._id
      );

      state.fields.splice(index, 1);

      return {
        ...state,
        fields: [action.payload, ...state.fields]
      };
    case DELETE_FIELD:
      return {
        ...state,
        fields: state.fields.filter(field => field._id !== action.payload)
      };
    case FIELD_LOADING:
      return {
        ...state,
        fieldLoading: true
      };
    case FIELDS_LOADING:
      return {
        ...state,
        fieldsLoading: true
      };
    default:
      return state;
  }
}
