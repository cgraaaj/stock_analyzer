import { FETCH_DATA, CHANGE_MODE } from "../actions/types";

const INTIAL_STATE = {
  mode: "INDEX",
  label: "Index",
  indexList: [{ key: 's', value: "", text: '--Select--' }, { key: 'n', value: "NIFTY", text: 'NIFTY' }, { key: 'bn', value: "BANKNIFTY", text: 'BANKNIFTY' }, { key: 'fn', value: "FINNIFTY", text: 'FINNIFTY' }],
  index: "indices",
  expiryDates: [],
  data:{}
};

const confReducer = (state = INTIAL_STATE, action) => {

  switch (action.type) {
    case FETCH_DATA:
      console.log(action.payload.data)
      let expiryDates = action.payload.data.records.expiryDates
      expiryDates.unshift('--Select--')
      return { ...state, expiryDates, data:action.payload.data.records };
    case CHANGE_MODE:
      console.log(action.payload.mode)
      if (action.payload.mode === 'INDEX') {
        return INTIAL_STATE
      } else {
        let indexList = action.payload.data.map((stock, i) => ({ key: i, value: stock, text: stock }))
        indexList.unshift({ key: 's', value: "", text: '--Select--' })
        return { ...INTIAL_STATE, mode: action.payload.mode, label: "Stock", index: 'equities', indexList }
      }
    default:
      return state;
  }
};

export default confReducer
