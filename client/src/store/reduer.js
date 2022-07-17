import { ADD_USER, GET_USERS, REMOVE_USER, UPDATE_USER } from "./actionTypes"

const initialState = {
  users: [],
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
            ...state,
            users: action.payload
        }
    case ADD_USER:
      let id = state.users.findIndex(user => user._id === action.payload._id)
      if (id === -1) {
        return {
          ...state,
          users: [...state.users, action.payload],
        }
      }
      return state
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      }
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload._id) {
            return action.payload
          }
          return user
        }),
      }
    default:
      return state
  }
}

export default reducer
