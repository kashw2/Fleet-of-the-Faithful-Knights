import {User} from "../../../../../core/src";
import {Vote} from "../../../../../core/src/models/vote";

export interface AppState {
  readonly user: User;
  readonly votes: Vote[];
}
