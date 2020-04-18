import {User} from "../../../../../core/src";
import {UserActions} from "../actions/user-action";

export function userReducer(state: User, action: UserActions) {
  // @ts-ignore
  if (state === "undefined") {
    return state;
  }
  switch (action.type) {
    case "[USER] Add":
      return action.getData();
    case "[USER] Read":
      return action.getData();
    case "[USER] Remove":
      return [state, action.getData()];
    default:
      return state;
  }
}
