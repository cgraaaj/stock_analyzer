import { combineReducers } from "redux";
import { reducer as fromReducer } from "redux-form";

import ocReducer from "./ocReducer";
import confReducer from "./confReducer";
import uptrendReducer from './uptrendReducer'
export default combineReducers({
  form: fromReducer,
  conf: confReducer,
  oc: ocReducer,
  uptrend: uptrendReducer
});
