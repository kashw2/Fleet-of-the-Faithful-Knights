import {Action} from "@ngrx/store";
import {User} from "../../../../../core/src";

export const readUser = "[USER] Read";
export const addUser = "[USER] Add";
export const removeUser = "[USER] Remove";

export class ReadUserAction implements Action {
  readonly type = readUser;

  constructor(public data: User) {
  }

  getData(): User {
    return this.data;
  }

}

export class AddUserAction implements Action {
  readonly type = addUser;

  constructor(public data: User) {
  }

  getData(): User {
    return this.data;
  }

}

export class RemoveUserAction implements Action {
  readonly type = removeUser;

  constructor(public data: User) {
  }

  getData(): User {
    return this.data;
  }

}

export type UserActions = ReadUserAction | AddUserAction | RemoveUserAction;
