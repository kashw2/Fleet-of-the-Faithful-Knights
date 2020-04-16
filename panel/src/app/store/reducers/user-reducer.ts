import {User} from "../../../../../core/src";
import {UserActions} from "../actions/user-action";

export function userReducer(state: User, action: UserActions) {
  switch (action.type) {
    case "[USER] Add":
      return [state, action.getData()];
    case "[USER] Read":
      return [state, action.getData()];
    case "[USER] Remove":
      return [state, action.getData()];
    default:
      return state;
  }
}
