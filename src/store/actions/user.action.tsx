import * as types from "../action-types";
import { push } from "connected-react-router";
export default {
  add() {
    return {
      type: types.ADD,
    };
  },
  goUser() {
    return push("/user");
  },
};
