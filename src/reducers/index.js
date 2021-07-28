import { combineReducers } from "redux";
import { reducer as fromReducer } from "redux-form";

import ocReducer from "./ocReducer";
import confReducer from "./confReducer";

export default combineReducers({
  form: fromReducer,
  conf: confReducer,
  oc: ocReducer,
});
